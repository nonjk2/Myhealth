import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabProps} from '../routes';

const ActivePage: React.FC<TabProps> = ({route}: TabProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>여기는 {route.name} 페이지에요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default ActivePage;
