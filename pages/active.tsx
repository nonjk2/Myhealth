/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TabProps} from '../routes';
import {Card} from 'react-native-paper';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
  const neonAnimate = useRef<Animated.Value>(new Animated.Value(0)).current;
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
  }, [neonAnimate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), 'yyyy.MM.dd HH:mm:ss', {locale: ko}));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Card>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
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
  itemsContainer: {
    height: WIDTH * 0.2,
    width: WIDTH * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
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
