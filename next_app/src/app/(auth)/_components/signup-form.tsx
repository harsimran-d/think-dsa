"use client";
import MailIcon from "@/icons/MailIcon";
import NotepadText from "@/icons/NotepadText";
import User from "@/icons/User";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { sendSignupOtp } from "@/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  firstName: z.string().trim().nonempty({ message: "First Name is required" }),
  lastName: z.string().trim().optional(),
});

const SignupForm = () => {
  const params = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // await sendSignupOtp(data.email, data.firstName, data.lastName ?? "");
  };
  return (
    <div className="flex w-full overflow-auto">
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
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex h-[52px] w-full items-center rounded-lg bg-[#F5F5F5] px-4 py-2">
                    <User className="mr-2 text-[#b2b2b2]" />
                    <input
                      {...field}
                      placeholder="First Name"
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
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex h-[52px] w-full items-center rounded-lg bg-[#F5F5F5] px-4 py-2">
                    <NotepadText className="mr-2 text-[#b2b2b2]" />
                    <input
                      {...field}
                      placeholder="Surname (optional)"
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

          {params?.get("error") && (
            <div className="text-sm text-red-500">
              Error: {params?.get("error")}
            </div>
          )}
          <button className="m-auto flex w-full" type="submit">
            <div className="h-[52px] w-full rounded-full bg-[#1B1B1B]">
              <div className="flex h-full w-full items-center justify-center font-normal text-white">
                Create Account
              </div>
            </div>
          </button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
