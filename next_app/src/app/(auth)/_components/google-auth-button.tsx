"use client";
import { signIn } from "next-auth/react";
import Google from "@/icons/Google";
import { toast } from "sonner";

const GoogleAuthButton = () => {
  const handleSignIn = async () => {
    const result = await signIn("google");
    console.log("result", result);
    if (result?.error) {
      console.error("Error signing in with Google:", result.error);
      toast.error("Error signing in with Google");
    }
  };
  return (
    <div className="flex w-full max-w-sm p-2">
      <button className="w-full" onClick={handleSignIn}>
        <div className="flex h-[60px] items-center justify-center gap-2 self-stretch rounded-full border-2 hover:bg-slate-50">
          <Google className="h-5 w-5" />
          <div className="font-bold">Continue with Google</div>
        </div>
      </button>
    </div>
  );
};

export default GoogleAuthButton;
