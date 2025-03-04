"use client";

import GoogleAuthButton from "./google-auth-button";
import LoginForm from "./login-form";
import NavTab from "./nav-tab";
import OrDivider from "./or-divider";
import SignupForm from "./signup-form";
import VerifyForm from "./verify-form";
import { useSearchParams } from "next/navigation";

const AuthForm = ({ page }: { page: string }) => {
  const params = useSearchParams();
  const showVerifyForm = params?.get("verify") === "true";
  const email = params?.get("email");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-auto">
      {showVerifyForm && email ? (
        <div className="m-auto flex flex-col sm:w-[380px]">
          <VerifyForm />
        </div>
      ) : (
        <div className="m-auto flex w-[340px] flex-col gap-5 overflow-auto sm:w-[380px]">
          <NavTab page={page} />
          <GoogleAuthButton />
          <OrDivider />
          {page == "login" ? <LoginForm /> : <SignupForm />}
        </div>
      )}
    </div>
  );
};

export default AuthForm;
