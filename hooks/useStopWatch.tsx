import {useState, useRef, useEffect} from 'react';
export type LapData = {
  time: string;
  lap: number;
  rest?: string;
};
/** 시간에 0 붙이기 */
const padStart = (num: number) => {
  return num.toString().padStart(2, '0');
};
/** 시간 포멧팅 */
export const formatMs = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  minutes = minutes % 60;
  seconds = seconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);

  let str = `${padStart(minutes)}:${padStart(seconds)}.${padStart(ms)}`;

  if (hours > 0) {
    str = `${padStart(hours)}:${str}`;
  }

  return str;
};
export const useStopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeWhenLastStopped, setTimeWhenLastStopped] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [restTime, setRestTime] = useState<number>(0);

  const interval = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    if (startTime > 0) {
      interval.current = setInterval(() => {
        setTime(() => Date.now() - startTime + timeWhenLastStopped);
      }, 1);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = undefined;
        console.log('종료됨');
      }
      return () => clearInterval(interval.current);
    }
  }, [startTime, timeWhenLastStopped]);
  /** 시작 */
  const start = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };
  /** 일시정지 */
  const stop = () => {
    setIsRunning(false);
    setStartTime(0);
    setTimeWhenLastStopped(time);
  };

  /** 정지 , 시간 0 ,마지막시간 0 , Laptime 0 */
  const reset = () => {
    setIsRunning(false);
    setStartTime(0);
    setTimeWhenLastStopped(0);
    setTime(0);
    setLaps([]);
    setIsRest(false);
    setRestTime(0);
  };
  const restStart = () => {
    const RestStartTime = laps[0] ? time - laps[laps.length - 1] || 0 : time;
    setIsRest(true);
    setRestTime(RestStartTime);
  };
  const lap = async () => {
    await setLaps(v => [time, ...v]);
    await setIsRest(false);
    // setRestTime(0);
  };
  let slowestLapTime: number | undefined;
  let fastestLapTime: number | undefined;

  const formattedLapData: LapData[] = laps.map((l, index) => {
    const previousLap = laps[index + 1] || 0;
    const lapTime = l - previousLap;
    if (!slowestLapTime || lapTime > slowestLapTime) {
      slowestLapTime = lapTime;
    }

    if (!fastestLapTime || lapTime < fastestLapTime) {
      fastestLapTime = lapTime;
    }
    return {
      time: formatMs(lapTime),
      lap: laps.length - index,
      rest: formatMs(lapTime - restTime),
    };
  });
  return {
    start,
    stop,
    isRunning,
    isRest,
    time: formatMs(time),
    restTime: formatMs(restTime),
    currentRestTime: formatMs(time - restTime || 0),
    reset,
    lap,
    laps: formattedLapData,
    currentLapTime: laps[0] ? formatMs(time - laps[0] || 0) : formatMs(time),
    hasStarted: time > 0,
    slowestLapTime: formatMs(slowestLapTime || 0),
    fastestLapTime: formatMs(fastestLapTime || 0),
    restStart,
  };
};
