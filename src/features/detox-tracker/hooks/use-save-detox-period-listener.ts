import { useCallback } from "react";
import { browser, History } from "wxt/browser";

import { useListener } from "~/hooks/use-listener";

import { useNotion } from "../api/use-notion";
import { useTrackingTargetStorage } from "../storages/tracking-target.storage";

export const useSaveDetoxPeriodListener = () => {
  const { createPage } = useNotion();
  const { trackingTargets, replace } = useTrackingTargetStorage();

  const handleHistoryVisited = useCallback(
    (result: History.HistoryItem) => {
      const trackingTarget = trackingTargets.find(
        (target) => result.title?.includes(target.value) || result.url?.includes(target.value),
      );

      if (!trackingTarget || !result.lastVisitTime) return;

      replace({ ...trackingTarget, restartTime: result.lastVisitTime });

      if (result.lastVisitTime - trackingTarget.restartTime > 10 * 60 * 1000) {
        createPage({
          trackingTarget: trackingTarget.value,
          previousVisitTime: new Date(trackingTarget.restartTime),
          latestVisitTime: new Date(result.lastVisitTime),
        });
      }
    },
    [createPage, trackingTargets, replace],
  );

  useListener(browser.history.onVisited, handleHistoryVisited);
};
