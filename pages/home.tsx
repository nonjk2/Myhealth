import {getDate} from 'date-fns';
import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WeekCalendar from '../components/calender';
import {TabProps} from '../routes';
import {fetchUser} from '../slices/examslice';
const DATA = [
  {
    complete: false,
    date: 'Sat Jul 12 2022 22:59:13 GMT+0900 (대한민국 표준시)',
    firstName: 'Kwon1',
    lastName: 'YoungJae1',
    email: 'kyoje11@gmail1.com',
  },
  {
    complete: false,
    date: 'Sat Jul 11 2022 22:59:13 GMT+0900 (대한민국 표준시)',
    firstName: 'Kwon2',
    lastName: 'YoungJae2',
    email: 'kyoje11@gmail2.com',
  },
  {
    complete: true,
    date: 'Sat Jul 15 2022 22:59:13 GMT+0900 (대한민국 표준시)',
    firstName: 'Kwon3',
    lastName: 'YoungJae2',
    email: 'kyoje11@gmail2.com',
  },
  {
    complete: true,
    date: 'Sat Jul 14 2022 22:59:13 GMT+0900 (대한민국 표준시)',
    firstName: 'Kwon4',
    lastName: 'YoungJae4',
    email: 'kyoje11@gmail4.com',
  },
  {
    complete: true,
    date: 'Sat Jul 14 2022 22:59:13 GMT+0900 (대한민국 표준시)',
    firstName: 'Kwon5',
    lastName: 'YoungJae5',
    email: 'kyoje11@gmail5.com',
  },
];

interface items {
  complete: boolean;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
}

const HomePage: React.FC<TabProps> = ({}) => {
  const [date, setDate] = useState(new Date());
  const CalenderDate = getDate(date);
  const dispatch = useDispatch();
  const examslice = useSelector(state => state.examslice);
  const MyActivity = ({data}: {data: items}) =>
    // getDate(data.date) === date
    CalenderDate === getDate(new Date(data.date)) ? (
      <View style={styles.flatitems}>
        <Text style={{fontSize: 24}}>{data.firstName}</Text>
        <Button title="asdasd" onPress={() => console.log(examslice)} />
        <Button title="123123" onPress={() => dispatch(fetchUser())} />
      </View>
    ) : (
      <View />
    );

  return (
    <View style={styles.container}>
      <WeekCalendar date={date} onChange={newDate => setDate(newDate)} />
      {/* <FlatList
        data={DATA}
        renderItem={({item}) => <MyActivity data={item} />}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  flatitems: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default HomePage;
