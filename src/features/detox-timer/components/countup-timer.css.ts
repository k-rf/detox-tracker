import { style } from "@vanilla-extract/css";

import { vars } from "~/assets/css/theme.css";

export const rootStyle = style({
  color: vars.palette.primary,
  fontSize: vars.fontSize.xl,
});
