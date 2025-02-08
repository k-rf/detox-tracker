import { useCallback, useState } from "react";
import { browser } from "wxt/browser";

import { Stack } from "~/components/ui/layout/stack";
import { useListener } from "~/hooks/use-listener";

import { TrackingTargetModel } from "../models/tracking-target.model";
import { useTrackingTargetStorage } from "../storages/tracking-target.storage";

import { CountupTimer } from "./countup-timer";
import { TrackingTarget } from "./tracking-target";

interface Props {
  trackingTarget: TrackingTargetModel;
}

export const DetoxTimer = ({ trackingTarget }: Props) => {
  const { replace } = useTrackingTargetStorage();

  const [initialTime, setInitialTime] = useState(Math.floor(Date.now() / 1000));
  const [status, setStatus] = useState<"running" | "paused">("paused");

  const handleSave = useCallback((value: TrackingTargetModel) => replace(value), [replace]);

  const handler = useCallback(async () => {
    browser.history
      .search({ text: trackingTarget.value, maxResults: 1, startTime: 0 })
      .then(([latest]) => {
        if (latest?.lastVisitTime) {
          const lastVisitTime = latest.lastVisitTime;
          setInitialTime(Math.floor(lastVisitTime / 1000));
          setStatus("running");
        } else {
          setInitialTime(Math.floor(Date.now() / 1000));
          setStatus("paused");
        }
      });
  }, [trackingTarget.value]);

  useListener(browser.history.onVisited, handler, { execOnInit: true });

  return (
    <Stack direction="column">
      <TrackingTarget trackingTarget={trackingTarget} onSave={handleSave} />
      <CountupTimer seconds={initialTime} status={status} />
    </Stack>
  );
};
