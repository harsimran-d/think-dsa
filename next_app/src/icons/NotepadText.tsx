import React from "react";

import { cn } from "@/lib/utils";

export type IconProps = React.SVGProps<SVGSVGElement>;

const NotepadText = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      className={cn("", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="21"
      viewBox="0 0 17 21"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 5.5C0.5 3.14298 0.5 1.96447 1.23223 1.23223C1.96447 0.5 3.14298 0.5 5.5 0.5H11.5C13.857 0.5 15.0355 0.5 15.7678 1.23223C16.5 1.96447 16.5 3.14298 16.5 5.5V15.5C16.5 17.857 16.5 19.0355 15.7678 19.7678C15.0355 20.5 13.857 20.5 11.5 20.5H5.5C3.14298 20.5 1.96447 20.5 1.23223 19.7678C0.5 19.0355 0.5 17.857 0.5 15.5V5.5ZM13.5 13.5C13.5 14.6046 12.6046 15.5 11.5 15.5C10.3954 15.5 9.5 14.6046 9.5 13.5C9.5 12.3954 10.3954 11.5 11.5 11.5C12.6046 11.5 13.5 12.3954 13.5 13.5ZM11.1033 15.8039H11.1033H11.1034C11.2332 15.8059 11.3655 15.808 11.5 15.808C11.6345 15.808 11.7668 15.8059 11.8966 15.8039H11.8967H11.8967C13.1827 15.7839 14.2118 15.7679 14.4486 17.7999C14.5125 18.3485 14.0523 18.8 13.5 18.8H9.5C8.94772 18.8 8.4875 18.3485 8.55143 17.7999C8.78825 15.7679 9.81731 15.7839 11.1033 15.8039ZM2.75 4.5C2.75 4.08579 3.08579 3.75 3.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H3.5C3.08579 5.25 2.75 4.91421 2.75 4.5ZM3.5 6.75C3.08579 6.75 2.75 7.08579 2.75 7.5C2.75 7.91421 3.08579 8.25 3.5 8.25H11.5C11.9142 8.25 12.25 7.91421 12.25 7.5C12.25 7.08579 11.9142 6.75 11.5 6.75H3.5Z"
        fill="#B2B2B2"
      />
    </svg>
  ),
);

NotepadText.displayName = "NotepadText";
export default NotepadText;
