import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const widthVar = createVar();

export const rootStyle = style({
  display: "flex",
  width: widthVar,
});

const position = {
  start: "start",
  center: "center",
  end: "end",
} as const;

export const alienItemVariant = styleVariants(position, (position) => [{ alignItems: position }]);

export const justifyContentVariant = styleVariants(position, (position) => [
  { justifyContent: position },
]);
