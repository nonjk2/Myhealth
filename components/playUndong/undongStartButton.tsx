import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
type props = {
  navigation: any;
};

const UndongStartButton: React.FC<props> = ({navigation}) => {
  const SearchingFrom = () => {
    navigation.navigate('Active');
  };
  return (
    <TouchableOpacity
      onPress={() => {
        SearchingFrom();
      }}>
      <View style={{marginHorizontal: 10}}>
        <IonIcon name={'play'} size={36} color={'#fff'} />
        {/* <Text>운동하기</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default UndongStartButton;
