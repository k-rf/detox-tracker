import { useCallback, useState } from "react";
import { browser, History } from "wxt/browser";

import { Stack } from "~/components/ui/layout/stack";
import { useListener } from "~/hooks/use-listener";
import { toMs } from "~/utils/to-ms";

import { TrackingTargetModel } from "../models/tracking-target.model";
import { useTrackingTargetStorage } from "../storages/tracking-target.storage";
import { searchHistory } from "../utils/search-history";

import { CountupTimer } from "./countup-timer";
import { TrackingTarget } from "./tracking-target";

interface Props {
  trackingTarget: TrackingTargetModel;
}

export const DetoxTracker = ({ trackingTarget }: Props) => {
  const { replace } = useTrackingTargetStorage();

  const [initialTime, setInitialTime] = useState(Math.floor(Date.now() / 1000));
  const [status, setStatus] = useState<"running" | "paused">("paused");

  const handleSave = useCallback(
    (value: TrackingTargetModel) => {
      searchHistory(value, {
        found: (updated) => {
          setInitialTime(toMs(updated.restartTime));
          setStatus("running");
          replace(updated);
        },
        none: (updated) => {
          setInitialTime(toMs(updated.restartTime));
          setStatus("paused");
          replace(updated);
        },
      });
    },
    [replace],
  );

  const handler = useCallback(
    (result?: History.HistoryItem) => {
      if (
        result?.title?.includes(trackingTarget.value) ||
        result?.url?.includes(trackingTarget.value)
      ) {
        setInitialTime(Math.floor((result.lastVisitTime ?? Date.now()) / 1000));
        setStatus("running");
      } else {
        searchHistory(trackingTarget, {
          found: (updated) => {
            setInitialTime(toMs(updated.restartTime));
            setStatus("running");
          },
          none: (updated) => {
            setInitialTime(toMs(updated.restartTime));
            setStatus("paused");
          },
        });
      }
    },
    [trackingTarget],
  );

  useListener(browser.history.onVisited, handler, { execOnInit: true });

  return (
    <Stack direction="column">
      <TrackingTarget trackingTarget={trackingTarget} onSave={handleSave} />
      <CountupTimer seconds={initialTime} status={status} />
    </Stack>
  );
};
