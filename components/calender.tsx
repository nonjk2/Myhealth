import {
  addDays,
  format,
  getDate,
  getDay,
  isSameDay,
  startOfWeek,
} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  date: Date;
  onChange: (value: Date) => void;
};
export type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};

// get week days
export const getWeekDays = (date: Date): WeekDay[] => {
  const start = startOfWeek(date, {weekStartsOn: 1});

  const final = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    final.push({
      formatted: format(date, 'EEE', {locale: ko}),
      date,
      day: getDate(date),
    });
  }

  return final;
};
const WeekCalendar: React.FC<Props> = ({date, onChange}) => {
  const [week, setWeek] = useState<WeekDay[]>([]);
  const TodayDate = format(new Date(), 'EEE', {locale: ko});

  useEffect(() => {
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);

  return (
    <View style={styles.container}>
      {week.map(weekDay => {
        const textStyles = [styles.label];
        const touchable = [styles.touchable];

        const sameDay = isSameDay(weekDay.date, date);
        if (sameDay) {
          textStyles.push(styles.selectedLabel);
          touchable.push(styles.selectedTouchable);
        }

        return (
          <View style={styles.weekDayItem} key={weekDay.formatted}>
            <Text
              style={
                weekDay.formatted === TodayDate
                  ? styles.ToDayText
                  : styles.weekDayText
              }>
              {weekDay.formatted}
            </Text>
            <TouchableOpacity
              onPress={() => onChange(weekDay.date)}
              style={touchable}>
              <Text style={textStyles}>{weekDay.day}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  ToDayText: {
    color: '#5585E8',
    marginVertical: 10,
    fontSize: 18,
  },
  weekDayText: {
    color: 'gray',
    marginVertical: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  selectedLabel: {
    color: 'white',
    fontSize: 16,
  },
  touchable: {
    borderRadius: 20,
    padding: 7.5,
    height: 35,
    width: 35,
  },
  selectedTouchable: {
    backgroundColor: 'green',
  },
  weekDayItem: {
    alignItems: 'center',
    padding: 20,
  },
});

export default WeekCalendar;
