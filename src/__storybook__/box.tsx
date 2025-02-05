import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";

import { alienItemVariant, rootStyle, justifyContentVariant, widthVar } from "./box.css";

interface Props {
  children: React.ReactNode;
  width?: number;
  alignItems?: keyof typeof alienItemVariant;
  justifyContent?: keyof typeof justifyContentVariant;
}

export const Box = ({ children, width, alignItems, justifyContent, ...props }: Props) => {
  return (
    <div
      {...props}
      className={clsx(
        rootStyle,
        alignItems && alienItemVariant[alignItems],
        justifyContent && justifyContentVariant[justifyContent],
      )}
      style={assignInlineVars({ [widthVar]: width ? `${width}px` : "100%" })}
    >
      {children}
    </div>
  );
};
