import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CalenderPage from '../components/calender';
import {TabProps} from '../routes';

const HomePage: React.FC<TabProps> = ({route}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.greeting}>여기는 {route.name} 페이지에요</Text> */}

      <CalenderPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default HomePage;
