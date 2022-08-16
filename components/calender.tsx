/* eslint-disable react-native/no-inline-styles */
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {List} from 'react-native-paper';
import {Undongitems} from '../slices/exercise';
import {LOCALEKR} from '../src/data/calenderLocale';
import RenderCard from './renderCardItem';

type Props = {
  date: Date;
  onChange: (value: Date) => void;
  exercise: Undongitems[];
};
export type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};
LocaleConfig.locales.fr = LOCALEKR;
LocaleConfig.defaultLocale = 'fr';
const WeekCalendar: React.FC<Props> = ({date, onChange, exercise}) => {
  const [selecttoday, setSelectToday] = useState(Date.now());
  const ActiveDate = exercise
    .map(e => format(e.id, 'yyyy-MM-dd'))
    .reduce((acc: any, cur: any) => {
      if (cur in acc) {
      } else {
        acc[cur] = {selected: true, marked: true, selectedColor: '#5585E8'};
      }
      return acc;
    }, {});

  return (
    <View style={{flex: 1}}>
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        markedDates={ActiveDate}
        horizontal={true}
        onDayPress={day => setSelectToday(day.timestamp)}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        // showWeekNumbers={true}
        hideExtraDays={false}
        showSixWeeks={true}
        dayComponent={({date, state, marking, onPress}: any) => {
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(date)}>
              <View
                style={[
                  true && {
                    shadowOpacity: 1,
                    shadowColor: 'cyan',
                    shadowRadius: 16,
                    backgroundColor: 'cyan',
                  },
                  {
                    backgroundColor:
                      state === 'disabled' ? '#000' : marking ? 'cyan' : '#fff',
                    width: 45,
                    height: 35,
                    borderRadius: 5,
                    opacity: 0.8,
                  },
                ]}>
                <Text
                  style={{
                    color:
                      state === 'disabled'
                        ? 'gray'
                        : marking
                        ? '#5585E8'
                        : 'black',
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
        }}
        theme={{
          calendarBackground: '#202020',
          dayTextColor: '#fff',
          monthTextColor: '#fff',
          textDisabledColor: '#202020',
          textDayFontWeight: '600',
          weekVerticalMargin: 5,
          indicatorColor: '#fff',
          inactiveDotColor: '#fff',
        }}
        // firstDay={1}
      />
      <View
        style={{
          // height: '100%',
          flex: 1,
          backgroundColor: '#616161',
          borderTopStartRadius: 20,
          shadowColor: '#fff',
          shadowOpacity: 0.6,
        }}>
        <ScrollView>
          <List.Section>
            <List.Subheader
              style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
              {format(selecttoday, 'dd일 - EEE요일', {locale: ko})}
            </List.Subheader>
            {exercise
              .filter(
                e =>
                  format(e.id, 'yyyy-MM-dd') ===
                  format(selecttoday, 'yyyy-MM-dd')
              )
              .map((item: Undongitems, index) => {
                return <RenderCard item={item} index={index} />;
              })}
          </List.Section>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WeekCalendar;
