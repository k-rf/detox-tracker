import { Schema } from "effect";
import { SaveIcon, XIcon } from "lucide-react";
import { match } from "ts-pattern";

import { vars } from "~/assets/css/theme.css";
import { Field } from "~/components/ui/field";
import { IconButton } from "~/components/ui/icon-button";
import { Stack } from "~/components/ui/layout/stack";

import { TrackingTargetModel } from "../models/tracking-target.model";

interface Props {
  target: TrackingTargetModel;
  onChange?: (value: TrackingTargetModel) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export const TrackingTargetField: React.FC<Props> = ({ target, onChange, onSave, onCancel }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Schema.decodeSync(TrackingTargetModel)({ ...target, value: e.currentTarget.value }));
  };

  return (
    <Stack direction="row" alignItems="center" gap={vars.spacing.xs}>
      <Field
        type="text"
        value={target.value}
        autoFocus
        onChange={handleChange}
        onKeyDown={(e) => {
          match(e.key)
            .with("Enter", () => onSave?.())
            .with("Escape", () => onCancel?.())
            .otherwise(() => {});
        }}
      />
      <IconButton size="sm" onClick={onSave}>
        <SaveIcon />
      </IconButton>
      <IconButton size="sm" onClick={onCancel}>
        <XIcon />
      </IconButton>
    </Stack>
  );
};
