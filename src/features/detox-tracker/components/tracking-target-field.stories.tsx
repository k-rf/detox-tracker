import { createId } from "@paralleldrive/cuid2";
import { fn, userEvent, within } from "@storybook/test";
import { useState } from "react";

import { TrackingTargetModel } from "../models/tracking-target.model";

import { TrackingTargetField } from "./tracking-target-field";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: TrackingTargetField,
  args: {
    target: { value: "https://example.com" },
  },
} as Meta<typeof TrackingTargetField>;

type Story = StoryObj<typeof TrackingTargetField>;

export const Default: Story = {};

export const Editing: Story = {
  args: {
    onSave: fn(),
    onCancel: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState<TrackingTargetModel>({
      id: createId(),
      value: "",
      restartTime: Date.now(),
    });

    return <TrackingTargetField {...args} target={value} onChange={(value) => setValue(value)} />;
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox");
    const [saveButton] = await canvas.findAllByRole("button");

    await userEvent.type(input, "https://example.com");

    if (saveButton) await userEvent.click(saveButton);
  },
};
