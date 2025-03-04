import { Suspense } from "react";
import AuthForm from "../_components/auth-form";

export default function Page() {
  return (
    <Suspense>
      <AuthForm page="login" />
    </Suspense>
  );
}
