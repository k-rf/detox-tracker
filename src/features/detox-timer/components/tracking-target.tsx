import { useCallback, useState } from "react";
import { match } from "ts-pattern";

import { TrackingTargetModel } from "../models/tracking-target.model";

import { TrackingTargetField } from "./tracking-target-field";
import { TrackingTargetLabel } from "./tracking-target-label";

interface Props {
  trackingTarget: TrackingTargetModel;
  onSave: (value: TrackingTargetModel) => void;
}

export const TrackingTarget = ({ trackingTarget, onSave }: Props) => {
  const [mode, setMode] = useState<"view" | "edit">(() => (trackingTarget.value ? "view" : "edit"));
  const [snapshot, setSnapshot] = useState(trackingTarget);

  const handleEdit = useCallback(() => {
    setSnapshot(trackingTarget);
    setMode("edit");
  }, [trackingTarget]);

  const handleSave = useCallback(() => {
    onSave(snapshot);
    setMode("view");
  }, [snapshot, onSave]);

  const handleCancel = useCallback(() => {
    setMode("view");
  }, []);

  const handleChange = useCallback((value: TrackingTargetModel) => {
    setSnapshot(value);
  }, []);

  return (
    <>
      {match(mode)
        .with("view", () => <TrackingTargetLabel target={trackingTarget} onEdit={handleEdit} />)
        .with("edit", () => (
          <TrackingTargetField
            target={snapshot}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ))
        .exhaustive()}
    </>
  );
};
