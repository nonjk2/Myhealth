import axios from 'axios';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import StopWatch from '../components/playUndong/stopWatch';
import {PlayProps} from '../routes';
import exerciseSlice from '../slices/exercise';
import {useAppDispatch, useAppSelector} from '../store';

const Playpage: React.FC<PlayProps> = ({route, navigation}) => {
  const {undongDetail} = route.params;
  const token = useAppSelector(state => state.user.AccessToken);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      const getMyUndongs = async () => {
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
        }
      };
      getMyUndongs();
    };
  }, [dispatch, token]);
  return (
    <SafeAreaView style={styles.container}>
      <StopWatch
        undongDetail={undongDetail}
        route={route}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Playpage;
