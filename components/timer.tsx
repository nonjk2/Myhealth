import React, {useState, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {UndongItemType} from '../types/undong';

interface timestamp {
  years: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  millis: number;
}

type timerProps = {
  undongDetail: UndongItemType;
  setUndongDetail: React.Dispatch<React.SetStateAction<UndongItemType>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const StopWatch: React.FC<timerProps> = ({
  undongDetail,
  setUndongDetail,
  active,
  setActive,
}) => {
  //   const [active, setActive] = useState(false);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [pausedTime, setPausedTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(
    new Date() - startDate + pausedTime
  );
  const pausedTimeRef = useRef(pausedTime);
  const activeRef = useRef(active);
  const startDateRef = useRef<any>(startDate);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    startDateRef.current = startDate;
  }, [startDate]);
  useEffect(() => {
    pausedTimeRef.current = pausedTime;
  }, [pausedTime]);

  const tick = useRef(() => {
    const Time = new Date() - startDateRef.current + pausedTimeRef.current;
    const Timer = requestAnimationFrame(tick.current);
    if (activeRef.current) {
      //   setElapsedTime(new Date() - startDateRef.current + pausedTimeRef.current);
      setUndongDetail({...undongDetail, ActiveTime: Time});
      Timer;
      if (!activeRef.current) {
        cancelAnimationFrame(Timer);
      }
    }
  });

  useEffect(() => {
    requestAnimationFrame(tick.current);
  }, [active]);

  const handleStartClick = useCallback(() => {
    if (!active) {
      setActive(true);
      setStartDate(new Date());
    }
  }, [active, setActive]);
  const handleStopClick = useCallback(() => {
    if (active) {
      setActive(false);
      setPausedTime(elapsedTime);
      setUndongDetail({...undongDetail, ActiveTime: elapsedTime});
      cancelAnimationFrame(requestAnimationFrame(tick.current));
    }
  }, [active, elapsedTime, setActive, setUndongDetail, undongDetail]);
  const handleLapTimeClick = useCallback(() => {
    if (active) {
      const newLapTimes: any = Array.from(lapTimes);
      newLapTimes.push(new Date() - startDate + pausedTime);
      setLapTimes(newLapTimes);
    }
  }, [active, lapTimes, pausedTime, startDate]);
  const handleResetClick = useRef(() => {
    setActive(false);
    setStartDate(new Date());
    setElapsedTime(0);
    setUndongDetail({...undongDetail, ActiveTime: 0});
    setPausedTime(0);
    setLapTimes([]);
  });

  const getTimesFromMillis: any = (source: number) => {
    const timeUnits = [
      ['millis', 1000],
      ['seconds', 60],
      ['minutes', 60],
      ['hours', 24],
      ['days', 7],
      ['weeks', 52],
      ['years'],
    ];

    return timeUnits.reduce((acc, [unitKey, unitValue]: any) => {
      if (unitValue) {
        const value = source % unitValue;
        source = (source - value) / unitValue;
        return Object.assign({}, acc, {[unitKey]: value});
      }
      return Object.assign({}, acc, {[unitKey]: source});
    }, {});
  };

  return (
    <View style={{height: 200}}>
      <View style={styles.tabbarContainer}>
        <TouchableOpacity onPress={handleLapTimeClick} style={styles.icontabs}>
          <Text>기록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={active ? handleStopClick : handleStartClick}
          style={styles.icontabs}>
          <IonIcon size={36} name={active ? 'pause' : 'play-circle'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleResetClick.current}
          style={styles.icontabs}>
          <IonIcon size={36} name={'refresh'} />
        </TouchableOpacity>
      </View>
      <View style={styles.timeStamp}>
        {/* <Text>{Math.floor(elapsedTime / (1000 * 60 * 60))} 시간 </Text>
        <Text>{Math.floor(elapsedTime / (1000 * 60))} 분 </Text> */}
        <Text>
          {getTimesFromMillis(undongDetail.ActiveTime).minutes.toString()} 분{' '}
        </Text>
        <Text>
          {getTimesFromMillis(undongDetail.ActiveTime).seconds.toString()} 초{' '}
        </Text>
      </View>
      <View style={styles.timeStamp}>
        {/* <Text>{Math.floor(elapsedTime / (1000 * 60 * 60))} 시간 </Text>
        <Text>{Math.floor(elapsedTime / (1000 * 60))} 분 </Text> */}
        <Text>{getTimesFromMillis(elapsedTime).minutes.toString()} 분 </Text>
        <Text>{getTimesFromMillis(elapsedTime).seconds.toString()} 초 </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonSetting: {
    flexDirection: 'row',
  },
  timeStamp: {
    flexDirection: 'row',
    width: 120,
  },
  tabbarContainer: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  icontabs: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default StopWatch;
