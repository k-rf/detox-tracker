import { PencilIcon } from "lucide-react";

import { vars } from "~/assets/css/theme.css";
import { IconButton } from "~/components/ui/icon-button";
import { Box } from "~/components/ui/layout/box";
import { Stack } from "~/components/ui/layout/stack";

import { TrackingTargetModel } from "../models/tracking-target.model";

import { RemoveTrackingTargetIconButton } from "./remove-tracking-target-icon-button";
import { rootStyle } from "./tracking-target-label.css";

interface Props {
  target: TrackingTargetModel;
  onEdit?: () => void;
}

export const TrackingTargetLabel: React.FC<Props> = ({ target, onEdit }) => {
  return (
    <Stack direction="row" alignItems="center" gap={vars.spacing.xs}>
      <Box className={rootStyle}>{target.value}</Box>
      <IconButton size="sm" onClick={onEdit}>
        <PencilIcon />
      </IconButton>
      <RemoveTrackingTargetIconButton trackingTarget={target} />
    </Stack>
  );
};
