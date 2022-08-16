import {getDate} from 'date-fns';
import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WeekCalendar from '../components/calender';
import {TabProps} from '../routes';
import {fetchUser} from '../slices/examslice';
import {useAppSelector} from '../store';
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
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
  const exercise = useAppSelector(state => state.exercise);
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
    <SafeAreaView style={styles.container}>
      <WeekCalendar
        date={date}
        onChange={newDate => setDate(newDate)}
        exercise={exercise}
      />
      {/* <FlatList
        data={DATA}
        renderItem={({item}) => <MyActivity data={item} />}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    // margin: 10,
    // paddingTop: 10,
    backgroundColor: '#202020',
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
