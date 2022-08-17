import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import {TabProps} from '../routes';
import {Avatar, Card, Snackbar} from 'react-native-paper';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import Undong from '../components/undong';
import {UndongItemType, UndongType} from '../types/undong';
import {useAppSelector} from '../store';
import {useDispatch} from 'react-redux';
import onToggle from '../slices/snack';

const WIDTH = Dimensions.get('window').width;

interface Props {
  type: number;
  id: number;
  key: string;
  title: string;
}

const ActivePage: React.FC<TabProps> = ({route}: TabProps) => {
  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), 'yyyy.MM.dd HH:mm:ss', {locale: ko})
  );
  const undongDataPatch = useAppSelector(state => state.exercise);
  const [undongData, setUndongData] = useState<UndongType>(
    undongDataPatch.map(e => e.undongDetail)
  );
  const [clockToggle, setClockToggle] = useState<boolean>(true);
  const neonAnimate = useRef<Animated.Value>(new Animated.Value(0)).current;
  const snackToggle = useAppSelector(state => state.snack.toggle);
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(neonAnimate, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(neonAnimate, {
          duration: 100,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(neonAnimate, {
          duration: 400,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, [neonAnimate, undongData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), 'yyyy.MM.dd HH:mm:ss', {locale: ko}));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderUndong = useCallback(
    ({item}: {item: UndongItemType}) => {
      return (
        <Undong
          item={item}
          setUndongData={setUndongData}
          undongData={undongData}
        />
      );
    },
    [undongData]
  );
  return (
    <SafeAreaView style={styles.container}>
      {clockToggle ? (
        <Card style={styles.cardContainer}>
          <Card.Content style={{alignItems: 'center'}}>
            <Animated.Text
              style={[
                styles.neon,
                {
                  shadowOpacity: neonAnimate,
                  shadowColor: 'cyan',
                  color: 'cyan',
                  fontSize: 20,
                },
              ]}>
              {currentTime.split(' ')[0].split('.')[0]}년{' '}
              {currentTime.split(' ')[0].split('.')[1]}월{' '}
              {currentTime.split(' ')[0].split('.')[2]}일
            </Animated.Text>
            <Animated.Text
              style={[
                styles.neon,
                {
                  shadowOpacity: neonAnimate,
                  shadowColor: 'cyan',
                  color: 'cyan',
                  fontSize: 25,
                  lineHeight: 35,
                },
              ]}>
              {currentTime.split(' ')[1].split(':')[0]}시{' '}
              {currentTime.split(' ')[1].split(':')[1]}분{' '}
              {currentTime.split(' ')[1].split(':')[2]}초
            </Animated.Text>
          </Card.Content>
        </Card>
      ) : null}
      <FlatList
        data={undongData}
        renderItem={renderUndong}
        style={{marginTop: 30}}
        keyExtractor={item => item.id}
        extraData={undongData}
      />
      <TouchableOpacity
        style={styles.plusbutton}
        onPress={() =>
          setUndongData([
            ...undongData,
            {
              id: Date.now(),
              startdate: Date.now(),
              name: '',
              reps: [],
              sets: [],
              enddate: 0,
              ActiveTime: 0,
            },
          ])
        }>
        <Avatar.Icon
          color={'#fff'}
          size={60}
          icon={'plus'}
          style={{backgroundColor: '#202020'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.toggleCurrentTime}
        onPress={() => setClockToggle(prev => !prev)}>
        <Avatar.Icon
          color={'#fff'}
          size={60}
          icon={'clock'}
          style={{backgroundColor: '#202020'}}
        />
      </TouchableOpacity>
      <Text style={styles.toggleCurrentTimeOnoff}>
        {clockToggle ? 'ON' : 'OFF'}
      </Text>
      <Snackbar
        visible={snackToggle}
        onDismiss={() =>
          dispatch(onToggle.actions.exerciseCreate(false, 'Off'))
        }
        style={{position: 'absolute', bottom: 0}}
        duration={3000}
        action={{
          label: '닫기',
          onPress: () => {
            dispatch(onToggle.actions.exerciseCreate(false, 'Off'));
          },
        }}>
        운동이름을 넣어주세요!
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  plusbutton: {
    position: 'absolute',
    top: '5%',
    left: '85%',
  },
  toggleCurrentTime: {
    position: 'absolute',
    top: '5%',
    right: '85%',
  },
  toggleCurrentTimeOnoff: {
    position: 'absolute',
    top: '7%',
    right: '83%',
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
  neon: {
    // shadowOpacity: 0.8,
    shadowRadius: 16,
    fontWeight: '700',
  },
  neonTimeOne: {},
  itemLabel: {
    alignSelf: 'center',
  },
  cardContainer: {
    alignSelf: 'center',
    position: 'relative',
    width: WIDTH,
    height: 60,
    backgroundColor: '#202020',
    top: 0,
    opacity: 0.9,
    marginVertical: 0,
  },
  cicletext: {
    width: '80%',
    height: '80%',
    backgroundColor: 'red',
    borderRadius: WIDTH * 0.1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default ActivePage;
