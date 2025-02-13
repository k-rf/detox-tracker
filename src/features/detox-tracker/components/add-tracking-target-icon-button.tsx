import { createId } from "@paralleldrive/cuid2";
import { PlusIcon } from "lucide-react";

import { IconButton } from "~/components/ui/icon-button";

import { useTrackingTargetStorage } from "../storages/tracking-target.storage";

export const AddTrackingTargetIconButton = () => {
  const { append } = useTrackingTargetStorage();

  return (
    <IconButton
      size="sm"
      onClick={() => {
        append({ id: createId(), value: "", restartTime: Date.now() });
      }}
    >
      <PlusIcon />
    </IconButton>
  );
};
