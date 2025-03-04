import React from "react";

import { cn } from "@/lib/utils";

export type IconProps = React.SVGProps<SVGSVGElement>;

const MailIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      className={cn("", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2C0 0.89543 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V12C20 13.1046 19.1046 14 18 14H2C0.895431 14 0 13.1046 0 12V2ZM2.42426 1.57574L9.78144 8.93291C9.90215 9.05362 10.0979 9.05362 10.2186 8.93291L17.5757 1.57574C17.8101 1.34142 18.1899 1.34142 18.4243 1.57574C18.6586 1.81005 18.6586 2.18995 18.4243 2.42426L13.6083 7.24024L18.4014 11.554C18.6477 11.7757 18.6677 12.1551 18.446 12.4014C18.2243 12.6477 17.8449 12.6677 17.5986 12.446L12.7586 8.08994L11.0671 9.78144C10.4778 10.3708 9.52225 10.3708 8.93291 9.78144L7.24142 8.08994L2.40138 12.446C2.15507 12.6677 1.7757 12.6477 1.55402 12.4014C1.33235 12.1551 1.5232 11.7757 1.59862 11.554L6.39171 7.24024L1.57574 2.42426C1.34142 2.18995 1.34142 1.81005 1.57574 1.57574C1.81005 1.34142 2.18995 1.34142 2.42426 1.57574Z"
        fill="#B2B2B2"
      />
    </svg>
  ),
);

MailIcon.displayName = "MailIcon";
export default MailIcon;
