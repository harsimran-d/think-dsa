import { cn } from "@/lib/utils";
import Link from "next/link";

const NavTab = ({ page }: { page: string }) => {
  return (
    <div className="flex w-full max-w-sm">
      <Link href={"/signin"} className="flex flex-1 items-center">
        <button
          className={cn(
            "w-full border-b-2 pb-2 pt-2 text-center font-medium text-gray-600 hover:text-black",
            page == "login" && "border-black text-black",
          )}
        >
          Log in
        </button>
      </Link>
      <Link href={"/signup"} className="flex-1 items-center justify-center">
        <button
          className={cn(
            "w-full border-b-2 pb-2 pt-2 font-medium text-gray-600 hover:text-black",
            page == "signup" && "border-black text-black",
          )}
        >
          Create account
        </button>
      </Link>
    </div>
  );
};

export default NavTab;
