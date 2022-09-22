import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {DateData} from 'react-native-calendars';
import {HEIGHT, WIDTH} from '../pages/home';

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
            borderColor: state === 'disabled' ? '#000' : '#e6d7d7',
          },
        ]}>
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
          <View
            style={{
              backgroundColor: 'gray',
              alignItems: 'center',
              borderRadius: 2,
            }}>
            <Text style={{fontSize: 12, color: 'white'}}>Today</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
export default DayComponent;
