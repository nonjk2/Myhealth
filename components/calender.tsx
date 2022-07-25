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
import {Agenda, AgendaSchedule, LocaleConfig} from 'react-native-calendars';

const healthData: AgendaSchedule = {
  '2022-07-22': [{name: 'item 1 - any js object'}],
  '2022-07-23': [{name: 'item 2 - any js object', height: 80}],
  '2022-07-24': [],
  '2022-07-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
};

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

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';
const WeekCalendar: React.FC<Props> = ({date, onChange}) => {
  const [week, setWeek] = useState<WeekDay[]>([]);
  const TodayDate = format(new Date(), 'EEE', {locale: ko});

  useEffect(() => {
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);

  return (
    <>
      <Agenda
        items={healthData}
        // // Callback that gets called when items for a certain month should be loaded (month became visible)
        // loadItemsForMonth={month => {
        //   console.log('trigger items loading');
        // }}
        // // Callback that fires when the calendar is opened or closed
        // // onCalendarToggled={calendarOpened => {
        // //   console.log(calendarOpened);
        // // }}
        // // Callback that gets called on day press
        // onDayPress={day => {
        //   console.log('day pressed');
        // }}
        // // Callback that gets called when day changes while scrolling agenda list
        // onDayChange={day => {
        //   console.log('day changed');
        // }}
        // // Initially selected day
        // selected={'2022-05-16'}
        // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2020-05-10'}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2025-05-30'}
        // // Max amount of months allowed to scroll to the past. Default = 50
        // pastScrollRange={50}
        // // Max amount of months allowed to scroll to the future. Default = 50
        // futureScrollRange={50}
        // // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return (
            <View>
              <Text>{item.day}</Text>
              <Text>{item.name}</Text>
            </View>
          );
        }}
        // // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        // renderDay={(day, item) => {
        //   return <View />;
        // }}
        // // Specify how empty date content with no items should be rendered
        // renderEmptyDate={() => {
        //   return <View />;
        // }}
        // // Specify how agenda knob should look like
        // renderKnob={() => {
        //   return <View />;
        // }}
        // // Specify what should be rendered instead of ActivityIndicator
        // renderEmptyData={() => {
        //   return <View />;
        // }}
        // // Specify your item comparison function for increased performance
        // // rowHasChanged={(r1, r2) => {
        // //   return r1.text !== r2.text;
        // // }}
        // // Hide knob button. Default = false
        // hideKnob={true}
        // // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        // showClosingKnob={false}
        // // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        // markedDates={{
        //   '2022-07-16': {selected: true, marked: true},
        //   '2022-07-17': {marked: true},
        //   '2022-07-18': {disabled: true},
        // }}
        // // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        // disabledByDefault={true}
        // // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        // onRefresh={() => console.log('refreshing...')}
        // // Set this true while waiting for new data from a refresh
        // refreshing={false}
        // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // // refreshControl={null}
        // // Agenda theme
        // theme={{
        //   // ...calendarTheme,
        //   agendaDayTextColor: 'yellow',
        //   agendaDayNumColor: 'green',
        //   agendaTodayColor: 'red',
        //   agendaKnobColor: 'blue',
        // }}
        // Agenda container style
      />
    </>
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
