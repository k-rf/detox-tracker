import { browser } from "wxt/browser";

import { TrackingTargetModel } from "../models/tracking-target.model";

export const searchHistory = (
  trackingTarget: TrackingTargetModel,
  callback: {
    found: (updated: TrackingTargetModel) => void;
    none: (updated: TrackingTargetModel) => void;
  },
) => {
  browser.history
    .search({ text: trackingTarget.value, maxResults: 1, startTime: 0 })
    .then(([latest]) => {
      if (latest?.lastVisitTime) {
        callback.found({ ...trackingTarget, restartTime: latest.lastVisitTime });
      } else {
        callback.none({ ...trackingTarget, restartTime: Date.now() });
      }
    });
};
