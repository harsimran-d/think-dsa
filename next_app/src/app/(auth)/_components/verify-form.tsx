"use client";
import { Box } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
// import { loginWithEmailAndOtp, signUpWithEmailAndOtp } from "@/actions/auth";

const formSchema = z.object({
  code: z
    .string()
    .nonempty({ message: "Verification code is required" })
    .length(6, { message: "Invalid verification code" }),
});
const VerifyForm = () => {
  const params = useSearchParams();
  const email = params?.get("email");
  const error = params?.get("error");
  const resendOTP = () => {
    if (params?.get("type") === "signin" && email) {
      // sendLoginOtp(email);
    } else if (params?.get("type") === "signup" && email) {
      // sendSignupOtp(email);
    }
  };
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (params?.get("type") === "signin" && email) {
      const resp = await signIn("credentials", {
        email: email,
        password: data.code,
      });
      console.log("signin resp", resp);
    } else if (params?.get("type") === "signup" && email) {
      // await signUpWithEmailAndOtp(email, data.code);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  return (
    <div className="flex w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4 sm:w-[380px]"
        >
          <div className="px-6 text-center">
            An email with the code has been sent to {email}
          </div>
          <div className="flex w-full justify-center">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex h-[52px] w-[330px] items-center rounded-lg bg-[#F5F5F5] px-4 py-2">
                      <Box className="mr-2 text-[#b2b2b2]" />
                      <input
                        type="text"
                        {...field}
                        placeholder="Verification code"
                        style={
                          {
                            "--autofill-text-color": "black",
                          } as React.CSSProperties
                        }
                        className="input-autofill w-full bg-transparent text-black placeholder-[#4c4c4c] focus:outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 px-0 text-center sm:px-6">
            <button
              className="text-center"
              onClick={() => {
                resendOTP();
                toast.success("Resent verification code");
              }}
              type="button"
            >
              <span className="underline">Did not get the code?</span>
            </button>
            {error && <div className="text-red-500">{error}</div>}
            <button className="m-auto flex w-[330px]" type="submit">
              <div className="h-[52px] w-full rounded-full bg-[#1B1B1B]">
                <div className="flex h-full w-full items-center justify-center font-normal text-white">
                  Submit
                </div>
              </div>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyForm;
