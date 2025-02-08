import { CountupTimer } from "./countup-timer";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: CountupTimer,
  args: {
    seconds: Math.floor(Date.now() / 1000),
    status: "running",
  },
} as Meta<typeof CountupTimer>;

type Story = StoryObj<typeof CountupTimer>;

export const Default: Story = {};
