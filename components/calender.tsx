/* eslint-disable react-native/no-inline-styles */
import {addDays, format, getDate, startOfWeek} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';
import {Undongitems} from '../slices/exercise';
import {LOCALEKR} from '../src/data/calenderLocale';
import * as Animatable from 'react-native-animatable';
import Timeline from 'react-native-timeline-flatlist';
import {labTime} from './timer';
import {HEIGHT, WIDTH} from '../pages/home';
const DATA = [
  {
    time: '09:00',
    title: 'Archery Training',
    description: 'The B',
    lineColor: '#009688',
  },
  {
    time: '10:45',
    title: 'Play Badminton',
    description: 'Badmi.',
  },
  {
    time: '12:00',
    title: 'Lunch',
  },
  {
    time: '14:00',
    title: 'Watch Soccer',
    description: 'Team sport  ',
    lineColor: '#009688',
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
    description: 'Look out :)',
  },
];
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

LocaleConfig.locales.fr = LOCALEKR;
LocaleConfig.defaultLocale = 'fr';
const WeekCalendar: React.FC<Props> = ({date, onChange, exercise}) => {
  // const [data, setdata] = useState({
  //   '2022-08-15': [{name: '1'}],
  //   '2022-08-16': [{name: '2'}],
  // });

  // const [items, setItems] = useState<any>({});
  const groupBy = (object: any[], property: string) => {
    return object.reduce((acc, obj) => {
      var key = format(obj[property], 'yyyy-MM-dd');
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  // const loadItems = (day: DateData) => {
  //   setTimeout(() => {
  //     for (let i = -15; i < 15; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);

  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //             day: strTime,
  //           });
  //         }
  //       }
  //     }
  //     const newItems: AgendaSchedule = {};
  //     Object.keys(items).forEach(key => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };
  const TimeLinerenderItem: React.FC = (rowData: any) => {
    return (
      <View style={{width: 150, height: HEIGHT}}>
        <Text style={[styles.title]}>{rowData.title}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
        {/* <Text>aasdfasdfasdf</Text> */}
      </View>
    );
  };
  const AgendaItem: React.FC<{
    item: Undongitems;
    onPress?: () => void;
    isFirst?: boolean;
  }> = ({item}) => {
    const [toggle, setToggle] = useState<boolean>(false);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setToggle(prev => !prev)}
        style={{marginRight: 10, marginTop: 17}}>
        <Card style={{backgroundColor: '#9c9999'}}>
          <Card.Content>
            <Animatable.View
              style={[
                {
                  height: 40,
                },
                toggle && {
                  flex: 1,
                  height: 600,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              transition={['height']}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                }}>
                <Text>{item?.undongDetail.name}</Text>
                <Text>{format(item.undongDetail.startdate, 'HH:mm:ss')}</Text>
              </View> */}

              {/* {toggle ? ( */}

              <Timeline
                style={styles.list}
                circleSize={22}
                circleColor="rgba(0,0,0,0)"
                lineColor="rgb(45,156,219)"
                titleStyle={{
                  textAlign: 'center',
                }}
                columnFormat={'single-column-left'}
                timeContainerStyle={{minWidth: 52}}
                timeStyle={{
                  textAlign: 'center',
                  backgroundColor: '#ff9797',
                  color: 'white',
                  // padding: 5,
                  width: 52,
                  height: 30,
                  borderRadius: 13,
                }}
                descriptionStyle={{color: '#000'}}
                data={DATA}
                renderDetail={TimeLinerenderItem}
              />
              {/* ) : null} */}
            </Animatable.View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Agenda
        items={groupBy(exercise, 'id')}
        renderItem={(item, isFirst) => (
          <AgendaItem
            isFirst={isFirst}
            item={item as unknown as Undongitems}
            // onPress={
            //   onPressItem
            //     ? () => onPressItem(item as unknown as CustomAgendaItem)
            //     : undefined
            // }
          />
        )}
        pastScrollRange={10}
        // loadItemsForMonth={loadItems}
        showOnlySelectedDayItems
        // renderItem={renderItem}
        // firstDay={4}
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
        // endFillColor={'#000'}
        renderEmptyData={() => {
          return (
            <TouchableOpacity style={{marginTop: 17}}>
              <Card style={{backgroundColor: '#9c9999'}}>
                <Card.Content>
                  <Animatable.View
                    style={[
                      {
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        // alignItems: 'center',
                        height: 40,
                      },
                    ]}>
                    <Text>운동을 하지 않은 날입니다.</Text>
                  </Animatable.View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
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
        onRefresh={() => console.log('refreshing...')}
        // // Set this true while waiting for new data from a refresh
        // refreshing={true}
        // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // refreshControl={null}
        // // Agenda theme
        theme={{
          // ...calendarTheme,
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: '#5585E8',
          backgroundColor: '#000',
          calendarBackground: 'gray',
          dayTextColor: '#fff',
          textColor: '#fff',
          monthTextColor: '#fff',
        }}
        // Agenda container style
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white',
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
  list: {
    flex: 1,
    // marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
});

export default WeekCalendar;
