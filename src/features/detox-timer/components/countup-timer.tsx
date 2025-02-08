import { TimerStatus, useTimer } from "~/hooks/use-timer";

import { rootStyle } from "./countup-timer.css";

interface Props {
  seconds: number;
  status?: TimerStatus;
}

export const CountupTimer: React.FC<Props> = ({ seconds, status = "paused" }) => {
  const now = useTimer({ initialSeconds: seconds, status });

  return <div className={rootStyle}>{now}</div>;
};
