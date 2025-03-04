import { NextAuthConfig } from "next-auth";

export default {
  trustHost: true,
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider == "google") {
        token.sub = account.providerAccountId;
        token.role = "USER";
        return token;
      }

      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user = session.user || {};
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
