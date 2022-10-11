// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {AxiosError} from 'axios';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {formatMs, useStopWatch} from '../../hooks/useStopWatch';
import {useAppSelector} from '../../store';
import {UndongPost} from '../../types/Posts/posts';
import {MyButton} from '../../utils/myButton';
import {LapList} from './undongSetList';

type stopWatchProp = {
  undongDetail: any;
  route: any;
  navigation: any;
};

const StopWatch: React.FC<stopWatchProp> = ({route, navigation}) => {
  const {undongDetail} = route.params;
  const [isLoading, setLoading] = useState<boolean>(false);
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
  const Token = useAppSelector(state => state.user.AccessToken);

  const savemyUndong = useCallback(async () => {
    const myPostData: UndongPost = {
      startdate: undongDetail.startdate,
      enddate: formatMs(Date.now()),
      activetime: time,
      name: undongDetail.name,
      sets: laps,
    };
    if (isRunning) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.API_URI}/undongs`,
        myPostData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(myPostData);
      console.log(response);
      navigation.navigate('Active');
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-shadow
      const AxiosError = (error as AxiosError).response;
      console.log(AxiosError);
      console.log(error);
      Alert.alert('에러!');
    } finally {
      setLoading(false);
    }
  }, [
    isRunning,
    Token,
    laps,
    navigation,
    time,
    undongDetail.name,
    undongDetail.startdate,
  ]);

  const AlertBtn = (btn: string) => {
    Alert.alert(
      btn === 'reset' ? '초기화 하시겠습니까?' : '저장 하시겠습니까?',
      '',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: btn === 'reset' ? '재설정' : '저장',
          onPress: () => (btn === 'reset' ? reset() : savemyUndong()),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.timeText}>{formatMs(time)}</Text>

        <View style={styles.row}>
          <MyButton
            onPress={() => {
              isRunning ? (isResting ? lap() : rest()) : AlertBtn('save');
            }}
            disabled={isRunning ? (isResting ? true : true) : false}
            isLoading={isLoading}
            isRunning={isRunning}
            theme={{
              btnColor: '#ff000035',
              nagativeBtnColor: '#7efc0035',
              textColor: 'rgb(255,0,0)',
              nagativeTextColor: 'rgb(124,252,0)',
            }}>
            {isRunning ? (isResting ? 'ON' : 'OFF') : '저장'}
          </MyButton>
          <MyButton
            onPress={() => {
              isRunning ? (isResting ? lap() : rest()) : AlertBtn('reset');
            }}
            isRunning={isRunning}
            theme={{
              btnColor: '#80808035',
              nagativeBtnColor: '#80808035',
              textColor: '#ffffff',
              nagativeTextColor: '#ffffff',
            }}>
            {isRunning ? (isResting ? '세트기록' : '쉬는시간') : '재설정'}
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
