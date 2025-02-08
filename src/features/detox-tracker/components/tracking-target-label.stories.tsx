import { TrackingTargetLabel } from "./tracking-target-label";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: TrackingTargetLabel,
  args: {
    target: { value: "https://example.com" },
  },
} as Meta<typeof TrackingTargetLabel>;

type Story = StoryObj<typeof TrackingTargetLabel>;

export const Default: Story = {};
