"use client";
import MailIcon from "@/icons/MailIcon";
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

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
});

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await api.post("/api/v1/auth/user/send-otp", {
      email: data.email,
      type: "signin",
    });
    if (response.status === 200) {
      toast.success("OTP sent successfully");
      router.push(`/signin?verify=true&email=${data.email}&type=signin`);
    }
  };

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col gap-6"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex h-[52px] w-full items-center rounded-lg bg-[#F5F5F5] px-4 py-2">
                    <MailIcon className="mr-2 text-[#b2b2b2]" />
                    <input
                      {...field}
                      placeholder="Email"
                      className="input-autofill w-full bg-transparent text-black placeholder-[#4c4c4c] focus:outline-none"
                      style={
                        {
                          "--autofill-text-color": "black",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {params?.get("error") && (
            <div className="text-sm text-red-500">
              Error: {params?.get("error")}
            </div>
          )}
          <button className="m-auto flex w-full" type="submit">
            <div className="h-[52px] w-full rounded-full bg-[#1B1B1B]">
              <div className="flex h-full w-full items-center justify-center font-normal text-white">
                Continue with email
              </div>
            </div>
          </button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
