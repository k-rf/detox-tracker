import { useCallback, useEffect, useState } from "react";
import { storage } from "wxt/storage";

import { TrackingTargetModel } from "../models/tracking-target.model";

interface TrackingTargetDataModelV1 {
  id: string;
  value: string;
}

interface TrackingTargetDataModelV2 {
  id: string;
  value: string;
  restartTime: number;
}

export const trackingTargetStorage = storage.defineItem<TrackingTargetDataModelV2[]>(
  "local:trackingTarget",
  {
    version: 2,
    init: () => [],
    fallback: [],
    migrations: {
      2: (data: TrackingTargetDataModelV1[]) => {
        return data.map((e) => ({ ...e, restartTime: Date.now() }));
      },
    },
  },
);

export const useTrackingTargetStorage = () => {
  const [trackingTargets, setTrackingTargets] = useState<TrackingTargetModel[]>([]);

  useEffect(() => {
    trackingTargetStorage.getValue().then((trackingTargets) => {
      setTrackingTargets(trackingTargets);
    });
  }, []);

  useEffect(() => {
    const unwatch = trackingTargetStorage.watch((next) => {
      setTrackingTargets(next);
    });

    return () => unwatch();
  }, []);

  const append = useCallback(
    (trackingTarget: TrackingTargetModel) => {
      trackingTargetStorage.setValue([...trackingTargets, trackingTarget]);
    },
    [trackingTargets],
  );

  const replace = useCallback(
    (trackingTarget: TrackingTargetModel) => {
      const index = trackingTargets.findIndex((target) => target.id === trackingTarget.id);
      trackingTargetStorage.setValue([
        ...trackingTargets.slice(0, index),
        trackingTarget,
        ...trackingTargets.slice(index + 1),
      ]);
    },
    [trackingTargets],
  );

  const remove = useCallback(
    (id: string) => {
      const index = trackingTargets.findIndex((target) => target.id === id);
      trackingTargetStorage.setValue([
        ...trackingTargets.slice(0, index),
        ...trackingTargets.slice(index + 1),
      ]);
    },
    [trackingTargets],
  );

  return { trackingTargets, append, replace, remove };
};
