import { Schema } from "effect";

export const TrackingTargetModel = Schema.Struct({
  id: Schema.String,
  value: Schema.String,
  restartTime: Schema.Number,
});

export type TrackingTargetModel = typeof TrackingTargetModel.Type;
export type TrackingTargetEncoded = typeof TrackingTargetModel.Encoded;
