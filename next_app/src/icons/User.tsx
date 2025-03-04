import React from "react";
import { cn } from "@/lib/utils";

export type IconProps = React.SVGProps<SVGSVGElement>;

const User = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.73 10.8213C10.8183 12.3573 9.58894 13.3572 8.21392 13.3572C6.83885 13.3572 5.60946 12.3573 4.69773 10.8211C3.69055 9.12415 3.07103 6.77281 3.07103 4.39224C3.07103 2.27668 5.33534 0.5 8.21392 0.5C11.0925 0.5 13.3568 2.27668 13.3568 4.39224C13.3568 6.77287 12.7372 9.12428 11.73 10.8213ZM8.21406 15.1248C10.0188 15.1248 11.6323 13.8124 12.8289 11.7963C12.9196 11.6437 13.0078 11.4869 13.0935 11.3265C14.3395 11.8625 15.9287 12.8151 15.9287 14.3159C15.9287 15.8859 15.1766 17.3132 13.6722 17.7624C12.3725 18.1505 10.5378 18.4998 8.21433 18.4998C5.89074 18.4998 4.05615 18.1505 2.75641 17.7624C1.25206 17.3132 0.5 15.8859 0.5 14.3159C0.5 12.813 2.08832 11.8607 3.33404 11.3254C3.41992 11.4862 3.50829 11.6432 3.59907 11.7961C4.79571 13.8123 6.40928 15.1248 8.21406 15.1248Z"
        fill="#B2B2B2"
      />
    </svg>
  ),
);

User.displayName = "User";
export default User;
