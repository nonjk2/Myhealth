import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import StopWatch from '../components/timer';
import {PlayProps} from '../routes';

const Playpage: React.FC<PlayProps> = ({route}) => {
  const {undongDetail} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StopWatch undongDetail={undongDetail} />
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