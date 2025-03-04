"use client";

import { signOut } from "next-auth/react";

const Page = () => {
  return (
    <div className="text-red text-lg">
      Hello Dashboard
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Page;
