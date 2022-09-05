import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {ActivityIndicator} from 'react-native-paper';
import WeekCalendar from '../components/calender';
import {TabProps} from '../routes';
import exerciseSlice from '../slices/exercise';
import {useAppDispatch, useAppSelector} from '../store';
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

const HomePage: React.FC<TabProps> = ({}) => {
  const [, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.user.AccessToken);
  const exercise = useAppSelector(state => state.exercise.undongs);

  useEffect(() => {
    const getMyUndongs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Config.API_URI}/undongs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(exerciseSlice.actions.setUndongs({undongs: response.data}));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMyUndongs();
  }, [dispatch, token]);
  return (
    <SafeAreaView style={[styles.container]}>
      {!exercise ? (
        <ActivityIndicator animating={true} />
      ) : (
        <WeekCalendar date={date} onChange={newDate => setDate(newDate)} />
      )}
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
