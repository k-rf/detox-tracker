import { createId } from "@paralleldrive/cuid2";

import { TrackingTarget } from "./tracking-target";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: TrackingTarget,
  args: {
    trackingTarget: {
      id: createId(),
      value: "https://example.com",
    },
  },
} as Meta<typeof TrackingTarget>;

type Story = StoryObj<typeof TrackingTarget>;

export const Default: Story = {};
