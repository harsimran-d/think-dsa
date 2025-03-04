import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { LoginSchema } from "@/schemas";
import { api } from "@/lib/axios";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
      profile: async (profile, tokens) => {
        try {
          const response = await api.post("/api/v1/auth/user/google-signin", {
            idToken: tokens.id_token,
          });
          if (response.status != 200) {
            console.log("Google signin failed");
            return undefined;
          }
          const user = response.data.user;
          console.log("Google signin success");
          return { ...user };
        } catch (err) {
          console.error(err);
          return undefined;
        }
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const validatedFields = LoginSchema.safeParse({ email, password });

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          try {
            console.log("email", email);
            console.log("password", password);
            const response = await api.post("/api/v1/auth/user/signin", {
              email,
              otp: password,
            });

            if (response.status != 200) {
              return null;
            } else {
              const { user } = response.data;
              if (user) {
                return user;
              }
              return null;
            }
          } catch (e) {
            console.error(e);
            return null;
          }
        }
        return null;
      },
    }),
  ],
});
