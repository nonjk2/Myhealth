import {format} from 'date-fns';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {DateData} from 'react-native-calendars';
import {HEIGHT, WIDTH} from '../pages/home';
import {useAppSelector} from '../store';

type DayProp = {
  date: DayProp;
  state: DayProp;
  marking: DayProp;
  onPress: DayProp;
  selecttoday: DateData;
  handlePresentModalPress: () => void;
};

const DayComponent: React.FC<DayProp> = ({
  date,
  state,
  marking,
  onPress,
  selecttoday,
  handlePresentModalPress,
}: any) => {
  const undongs = useAppSelector(state => state.exercise.undongs.undongs);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPress(date);
        state === 'disabled' ? null : handlePresentModalPress();
      }}>
      <View
        key={date.timestamp}
        style={[
          marking && {
            shadowOpacity: 1,
            shadowColor: 'cyan',
            shadowRadius: 16,
            backgroundColor: 'cyan',
          },
          {
            backgroundColor:
              state === 'disabled' ? '#000' : marking ? 'cyan' : '#fff',
            width: WIDTH * (1 / 7),
            height: HEIGHT * (1 / 8),
            opacity: 0.8,
            borderWidth: 0.4,
            borderColor:
              state === 'disabled'
                ? '#000'
                : state === 'today'
                ? 'red'
                : '#e6d7d7',
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color:
                state === 'disabled'
                  ? 'gray'
                  : marking
                  ? '#5585E8'
                  : date.timestamp === selecttoday.timestamp
                  ? 'red'
                  : '#000',
              margin: 2,
            }}>
            {date.day}
          </Text>
          {state === 'today' ? (
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: 'red',
              }}>
              Today
            </Text>
          ) : null}
        </View>
        {state !== 'disabled'
          ? undongs
              .filter(
                v =>
                  format(new Date(v.createdAt), 'yyyy-MM-dd') ===
                  format(new Date(date.timestamp), 'yyyy-MM-dd')
              )
              .map(v => {
                return (
                  <View
                    key={v._id}
                    style={{
                      backgroundColor: 'gray',
                      alignItems: 'center',
                      borderRadius: 2,
                      marginVertical: 1,
                    }}>
                    <Text style={{fontSize: 10, color: 'white'}}>{v.name}</Text>
                  </View>
                );
              })
          : null}
      </View>
    </TouchableOpacity>
  );
};
export default DayComponent;
