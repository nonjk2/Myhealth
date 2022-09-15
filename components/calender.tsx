import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {List} from 'react-native-paper';
import {HEIGHT, WIDTH} from '../pages/home';
import {LOCALEKR} from '../src/data/calenderLocale';
import {useAppSelector} from '../store';
import RenderCard from './renderCardItem';

type Props = {
  date: Date;
  onChange: (value: Date) => void;
};
export type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};
LocaleConfig.locales.fr = LOCALEKR;
LocaleConfig.defaultLocale = 'fr';
const WeekCalendar: React.FC<Props> = ({}) => {
  const [selecttoday, setSelectToday] = useState(Date.now());
  const exercise = useAppSelector(state => state.exercise.undongs.undongs);
  const undongImg = useAppSelector(state => state.exercise.undongs.undongimg);
  /** 운동을 한 날짜만 표기 */
  const ActiveDate = exercise
    .map(e => format(new Date(e.createdAt), 'yyyy-MM-dd'))
    .reduce((acc: any, cur: any) => {
      if (cur in acc) {
      } else {
        acc[cur] = {selected: true, marked: true, selectedColor: '#5585E8'};
      }
      return acc;
    }, {});
  const myActivity = [...exercise, ...undongImg].filter(
    e =>
      format(new Date(e.createdAt), 'yyyy-MM-dd') ===
      format(selecttoday, 'yyyy-MM-dd')
  );
  return (
    <View style={{flex: 1}}>
      <CalendarList
        calendarStyle={{paddingRight: 0, paddingLeft: 0}}
        markedDates={ActiveDate}
        horizontal={true}
        onDayPress={day => setSelectToday(day.timestamp)}
        pagingEnabled={true}
        futureScrollRange={5}
        pastScrollRange={10}
        scrollEnabled={true}
        showScrollIndicator={true}
        hideExtraDays={false}
        showSixWeeks={true}
        staticHeader={true}
        hideArrows={true}
        showsHorizontalScrollIndicator={true}
        current={format(selecttoday, 'yyyy-MM-dd')}
        animateScroll={true}
        // calendarStyle={{width: WIDTH}}
        dayComponent={({date, state, marking, onPress}: any) => {
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(date)}>
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
                    // width: 55,
                    width: WIDTH * (1 / 7),
                    height: HEIGHT * (1 / 9),
                    // borderRadius: 5,
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
                        : date.timestamp === selecttoday
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
        }}
        headerStyle={{margin: 0, width: WIDTH}}
        theme={{
          calendarBackground: '#202020',
          dayTextColor: '#fff',
          monthTextColor: '#fff',
          textDisabledColor: '#202020',
          textDayFontWeight: '600',
          indicatorColor: '#fff',
          inactiveDotColor: '#fff',
          weekVerticalMargin: 0,
          stylesheet: {
            'calendar-list': {
              main: {
                calendar: {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
              },
            },
          },
        }}
        // firstDay={1}
      />
      {/* 스타일시트 */}
      {/* <View
        style={{
          // height: '100%',
          flex: 1,
          backgroundColor: '#616161',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          shadowColor: '#fff',
          shadowOpacity: 0.6,
        }}>
        <ScrollView>
          <List.Section>
            <List.Subheader
              style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
              {format(selecttoday, 'dd일 - EEE요일', {locale: ko})}
            </List.Subheader>
            {myActivity.map((item, index) => {
              return <RenderCard item={item} index={index} key={item._id} />;
            })}
          </List.Section>
        </ScrollView>
      </View> */}
    </View>
  );
};

// const styles = StyleSheet.create({});

export default WeekCalendar;
