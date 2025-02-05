import { assignInlineVars } from "@vanilla-extract/dynamic";

import { directionVariant, gapVar } from "./stack.css";

interface Props {
  children: React.ReactNode;
  gap?: number;
  direction: keyof typeof directionVariant;
}

export const Stack = ({ children, direction, gap, ...props }: Props) => {
  return (
    <div
      {...props}
      className={directionVariant[direction]}
      style={assignInlineVars({ [gapVar]: `${gap ?? 0}px` })}
    >
      {children}
    </div>
  );
};
