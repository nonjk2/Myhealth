import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import WeekCalendar from '../components/calender';
import {TabProps} from '../routes';
import {useAppSelector} from '../store';
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

const HomePage: React.FC<TabProps> = ({}) => {
  const [date, setDate] = useState(new Date());
  const exercise = useAppSelector(state => state.exercise);

  return (
    <SafeAreaView style={styles.container}>
      <WeekCalendar
        date={date}
        onChange={newDate => setDate(newDate)}
        exercise={exercise}
      />
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
