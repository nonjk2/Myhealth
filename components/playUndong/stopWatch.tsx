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
    isResting,
    currentRestTime,
    rest,
    currentLapTime,
    hasStarted,
    slowestLapTime,
    fastestLapTime,
  } = useStopWatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.timeText}>{time}</Text>

        <View style={styles.row}>
          <MyButton
            onPress={() => {
              isRunning ? (isResting ? lap() : rest()) : reset();
            }}
            isRunning={isRunning}
            theme={{
              btnColor: '#80808035',
              nagativeBtnColor: '#80808035',
              textColor: '#ffffff',
              nagativeTextColor: '#ffffff',
            }}>
            {isRunning ? (isResting ? '랩' : '쉬는시간') : '재설정'}
          </MyButton>
          <MyButton
            onPress={() => {
              isRunning ? rest() : start();
            }}
            isRunning={isRunning}
            theme={{
              btnColor: '#ff000035',
              nagativeBtnColor: '#7efc0035',
              textColor: 'rgb(255,0,0)',
              nagativeTextColor: 'rgb(124,252,0)',
            }}>
            {isRunning ? (isResting ? 'ON' : 'OFF') : '기록하기'}
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
          currentRestTime={currentRestTime}
          laps={laps}
          fastestLapTime={fastestLapTime}
          slowestLapTime={slowestLapTime}
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
