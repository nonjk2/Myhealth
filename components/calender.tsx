import {
  differenceInCalendarDays,
  format,
  getDay,
  getMonth,
  getTime,
  getYear,
} from 'date-fns';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CalendarList, DateData, LocaleConfig} from 'react-native-calendars';
import {HEIGHT, WIDTH} from '../pages/home';
import {LOCALEKR} from '../src/data/calenderLocale';
import {useAppSelector} from '../store';
import RenderCard from './renderCardItem';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetSectionList,
  BottomSheetSectionListMethods,
} from '@gorhom/bottom-sheet';
import {ko} from 'date-fns/locale';
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
  const [selecttoday, setSelectToday] = useState<DateData>({
    year: getYear(Date.now()),
    month: getMonth(Date.now()),
    day: getDay(Date.now()),
    timestamp: getTime(Date.now()),
    dateString: format(Date.now(), 'yyyy-MM-dd'),
  });
  const exercise = useAppSelector(state => state.exercise.undongs.undongs);
  const undongImg = useAppSelector(state => state.exercise.undongs.undongimg);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [addSection, setAddSection] = useState([selecttoday.dateString]);
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
  /** 섹션리스트 데이터 핸들 */

  const sections = useMemo(
    () =>
      [...exercise, ...undongImg]
        .map(e => format(new Date(e.createdAt), 'yyyy-MM-dd'))
        .sort()
        .reduce((accumulator: string[], current) => {
          const length = accumulator.length;
          if (length === 0 || accumulator[length - 1] !== current) {
            accumulator.push(current);
          }
          return accumulator;
        }, [])
        .map(_ => ({
          title: `${_}`,
          data: [...exercise, ...undongImg].filter(
            $ => format(new Date($.createdAt), 'yyyy-MM-dd') === _
          ),
        })),
    [exercise, undongImg]
  );
  const rr = sections.findIndex(v => v.title === addSection[0]);

  /** 모달스타일시트 현재상태 */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const sectionListRef = useRef<BottomSheetSectionListMethods>(null);
  /** 모달스타일시트 Height */
  const snapPoints = useMemo(() => ['25%', '60%'], []);
  /** 모달스타일시트 스타일시트 OnOFF */
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  /** 모달스타일시트 바뀔때 */
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  /** 모달스타일시트 바깥쪽누를때 */
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    []
  );

  const BottomSheetrenderItem = useCallback(
    ({item}: any) => <RenderCard item={item} key={item._id} />,
    []
  );
  const CalenderDayOnpress = useCallback((day: DateData) => {
    setSelectToday(day);
    setAddSection([day.dateString]);
  }, []);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    rr === 0 ? null : setAddSection([sections[rr - 1].title, ...addSection]);
    setLoading(false);
  }, [addSection, rr, sections]);

  const renderSectionHeader = useCallback(
    ({section}: any) => (
      <View style={styles.sectionHeaderContainer}>
        <Text>{`${format(new Date(section.title), 'MM월 dd일')} ${format(
          new Date(section.title),
          'EEE요일',
          {locale: ko}
        )}`}</Text>
        <View style={{width: 200, flex: 1, paddingHorizontal: 15}}>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: '#b4b4b4',
            }}
          />
          <View style={{flex: 1}} />
        </View>
        <Text>
          {differenceInCalendarDays(Date.now(), new Date(section.title)) === 0
            ? '오늘'
            : `${differenceInCalendarDays(
                Date.now(),
                new Date(section.title)
              )}일전`}
        </Text>
      </View>
    ),
    []
  );
  return (
    <BottomSheetModalProvider>
      <View style={{flex: 1}}>
        <CalendarList
          calendarStyle={{paddingRight: 0, paddingLeft: 0}}
          markedDates={ActiveDate}
          horizontal={true}
          onDayPress={day => {
            CalenderDayOnpress(day);
            console.log(day);
          }}
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
          current={selecttoday.dateString}
          animateScroll={true}
          // calendarStyle={{width: WIDTH}}
          dayComponent={({date, state, marking, onPress}: any) => {
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
                        state === 'disabled'
                          ? '#000'
                          : marking
                          ? 'cyan'
                          : '#fff',
                      // width: 55,
                      width: WIDTH * (1 / 7),
                      height: HEIGHT * (1 / 8),
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
          }}
          // firstDay={1}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          enableOverDrag={false}
          overDragResistanceFactor={2}>
          <BottomSheetSectionList
            ref={sectionListRef}
            // ref={sectionListRef}
            sections={sections.filter(v => addSection.includes(v.title))} //
            keyExtractor={item => item.createdAt}
            renderItem={BottomSheetrenderItem}
            refreshing={isLoading}
            onRefresh={handleRefresh}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>운동을 하지않은날입니다</Text>
                </View>
              );
            }}
            // inverted={true}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  ItemcontentContainer: {
    backgroundColor: 'white',
  },
  BottomItemcontainer: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sectionHeaderContainer: {
    backgroundColor: 'white',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WeekCalendar;
