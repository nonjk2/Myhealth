import {useState, useRef, useEffect} from 'react';
import {LapData} from '../types/Posts/posts';

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
  const [isResting, setIsResting] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeWhenLastStopped, setTimeWhenLastStopped] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [restlaps, setRestLaps] = useState<number[]>([]);

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
      }
      return () => {
        clearInterval(interval.current);
        interval.current = undefined;
      };
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
    setRestLaps([]);
    setIsResting(false);
  };
  const lap = () => {
    setLaps(v => [time, ...v]);
    setIsResting(false);
  };
  const rest = () => {
    setRestLaps(v => [time, ...v]);
    setIsResting(true);
    setcurrentTime(time);
  };
  let slowestLapTime: number | undefined;
  let fastestLapTime: number | undefined;

  const formattedLapData: LapData[] = laps.map((l, index) => {
    const previousLap = laps[index + 1] || 0;
    const lapTime = l - previousLap;
    const previousRest = isResting ? restlaps[index + 1] : restlaps[index] || 0;
    const restTime = l - previousRest;

    if (!slowestLapTime || lapTime > slowestLapTime) {
      slowestLapTime = lapTime;
    }

    if (!fastestLapTime || lapTime < fastestLapTime) {
      fastestLapTime = lapTime;
    }

    return {
      time: formatMs(lapTime - restTime),
      lap: laps.length - index,
      restTime: formatMs(restTime),
      activetime: formatMs(lapTime),
    };
  });
  return {
    start,
    stop,
    isRunning,
    time: formatMs(time),
    reset,
    rest,
    isResting,
    currentRestTime: isResting
      ? formatMs(time - restlaps[0] || 0) // Rlap[1] = 10 //rap[0] = 14.51
      : formatMs(0),
    lap,
    laps: formattedLapData,
    currentLapTime: laps[0]
      ? isResting
        ? formatMs(currentTime - laps[0]) // 15초 - 11초 - 15초
        : formatMs(time - laps[0] || 0) // 쉬는시간x 랩이있을떄
      : isResting
      ? formatMs(restlaps[0])
      : formatMs(time),
    hasStarted: time > 0,
    slowestLapTime: formatMs(slowestLapTime || 0),
    fastestLapTime: formatMs(fastestLapTime || 0),
  };
};

// 1. 운동 타이머 서버로 포스트
// 2. 유저 홈진입시 겟 모든 운동 + 리덕스상태에 추가
// 3. 로컬스토리지에 authorization Token 저장 및 spalsh 자동로그인
// 4. Multer 이미지 업로드 서비스 추가
// 5. 달력 디자인 바꾸기

// 6. 할수있으면 마지막으로 달력 아젠다로 바꾸기
// 7. Aws 서버 코드 푸시

// —————————— 8.31 마무리 ——————————
