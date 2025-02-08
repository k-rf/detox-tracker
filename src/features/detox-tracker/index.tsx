import { vars } from "~/assets/css/theme.css";
import { Box } from "~/components/ui/layout/box";
import { Stack } from "~/components/ui/layout/stack";

import { AddTrackingTargetIconButton } from "./components/add-tracking-target-icon-button";
import { DetoxTracker } from "./components/detox-tracker";
import { useTrackingTargetStorage } from "./storages/tracking-target.storage";

export const DetoxTrackerFeature = () => {
  const { trackingTargets } = useTrackingTargetStorage();

  return (
    <Stack direction="column" gap={vars.spacing.md}>
      {trackingTargets.map((trackingTarget) => (
        <DetoxTracker key={trackingTarget.id} trackingTarget={trackingTarget} />
      ))}
      <Box justifyContent="center">
        <AddTrackingTargetIconButton />
      </Box>
    </Stack>
  );
};
