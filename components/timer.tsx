import React, {useState, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {List} from 'react-native-paper';
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
  elapsedTime: number;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
};
const StopWatch: React.FC<timerProps> = ({
  undongDetail,
  setUndongDetail,
  active,
  setActive,
  elapsedTime,
  setElapsedTime,
}) => {
  //   const [active, setActive] = useState(false);

  const [startDate, setStartDate] = useState<any>(Date.now());
  const [pausedTime, setPausedTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
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
    const Timer = requestAnimationFrame(tick.current);
    if (activeRef.current) {
      setElapsedTime(Date.now() - startDateRef.current + pausedTimeRef.current);
      // setUndongDetail({...undongDetail, ActiveTime: Time});
      Timer;
      if (!activeRef.current) {
        cancelAnimationFrame(Timer);
      }
    }
  });

  useEffect(() => {
    if (active) {
      requestAnimationFrame(tick.current);
    }
  }, [active]);

  const handleStartClick = useCallback(() => {
    if (!active) {
      setActive(true);
      setStartDate(Date.now());
    }
  }, [active, setActive]);
  const handleStopClick = useCallback(() => {
    if (active) {
      setActive(false);
      setPausedTime(elapsedTime);
      // setUndongDetail({...undongDetail, ActiveTime: elapsedTime});
      cancelAnimationFrame(requestAnimationFrame(tick.current));
    }
  }, [active, elapsedTime, setActive]);
  const handleLapTimeClick = useCallback(() => {
    if (active) {
      const newLapTimes: any = Array.from(lapTimes);
      newLapTimes.push(Date.now() - startDate + pausedTime);
      setLapTimes(newLapTimes);
    }
  }, [active, lapTimes, pausedTime, startDate]);
  const handleResetClick = useRef(() => {
    setActive(false);
    setStartDate(Date.now());
    setElapsedTime(0);
    // setUndongDetail({...undongDetail, ActiveTime: 0});
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
    <View style={[]}>
      <View style={styles.timeStamp}>
        <View
          style={{
            flex: 1,
            backgroundColor: ' blue',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>{getTimesFromMillis(elapsedTime).minutes.toString()} : </Text>
          <Text>{getTimesFromMillis(elapsedTime).seconds.toString()} </Text>
          {/* <Text>{getTimesFromMillis(elapsedTime).millis.toString()} </Text> */}
        </View>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          {/* <ListView */}
          <View />
        </View>
      </View>
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
    </View>
  );
};
const styles = StyleSheet.create({
  buttonSetting: {
    flexDirection: 'row',
  },
  timeStamp: {
    // width: 120,
    flexDirection: 'row',
    // height: 320,
  },
  tabbarContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
  },
  icontabs: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default StopWatch;
