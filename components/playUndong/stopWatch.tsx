import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useStopWatch} from '../../hooks/useStopWatch';
import {MyButton} from '../../utils/myButton';
import {LapList} from './undongSetList';

const StopWatch: React.FC<any> = ({}) => {
  const {
    time,
    isRunning,
    start,
    stop,
    reset,
    lap,
    laps,
    isRest,
    currentLapTime,
    hasStarted,
    slowestLapTime,
    fastestLapTime,
    restStart,
    currentRestTime,
    restTime,
  } = useStopWatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.timeText}>{time}</Text>

        <View style={styles.row}>
          <MyButton
            onPress={() => {
              isRunning ? lap() : reset();
            }}
            isRunning={isRunning}
            theme={{
              btnColor: '#80808035',
              nagativeBtnColor: '#80808035',
              textColor: '#ffffff',
              nagativeTextColor: '#ffffff',
            }}>
            {isRunning ? '랩' : '재설정'}
          </MyButton>
          <MyButton
            onPress={() => {
              isRunning ? restStart() : start();
            }}
            isRunning={isRunning}
            theme={{
              btnColor: '#ff000035',
              nagativeBtnColor: '#7efc0035',
              textColor: 'rgb(255,0,0)',
              nagativeTextColor: 'rgb(124,252,0)',
            }}>
            {isRunning ? '쉬는시간' : '기록하기'}
          </MyButton>
          <MyButton
            onPress={() => {
              isRunning ? stop() : start();
            }}
            isRunning={isRunning}
            theme={{
              btnColor: '#ff000035',
              nagativeBtnColor: '#7efc0035',
              textColor: 'rgb(255,0,0)',
              nagativeTextColor: 'rgb(124,252,0)',
            }}>
            {isRunning ? '정지' : '시작'}
          </MyButton>
        </View>

        <LapList
          hasStarted={hasStarted}
          currentLapTime={currentLapTime}
          laps={laps}
          isRest={isRest}
          restTime={restTime}
          fastestLapTime={fastestLapTime}
          slowestLapTime={slowestLapTime}
          currentRestTime={currentRestTime}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  timeText: {
    fontSize: 80,
    fontWeight: '200',
    marginTop: 100,
    color: '#fff',
    fontVariant: ['tabular-nums'], // fixed width character
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 100,
  },
});

export default StopWatch;
