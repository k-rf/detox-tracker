import { TrashIcon } from "lucide-react";

import { IconButton } from "~/components/ui/icon-button";

import { TrackingTargetModel } from "../models/tracking-target.model";
import { useTrackingTargetStorage } from "../storages/tracking-target.storage";

interface Props {
  trackingTarget: TrackingTargetModel;
}

export const RemoveTrackingTargetIconButton = ({ trackingTarget }: Props) => {
  const { remove } = useTrackingTargetStorage();

  return (
    <IconButton size="sm" onClick={() => remove(trackingTarget.id)}>
      <TrashIcon />
    </IconButton>
  );
};
