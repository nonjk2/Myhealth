import {useNavigationState} from '@react-navigation/native';
import {format} from 'date-fns';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ResponseUndongArrayData} from '../../types/Posts/posts';
type props = {
  navigation: any;
};

const UndongStartButton: React.FC<props> = ({navigation}) => {
  const undongDetail: ResponseUndongArrayData = {
    startdate: format(Date.now(), 'HH:mm'),
    name: 'ㅁㅇㄹ',
    // reps: [],
    sets: [],
    __v: 0,
    _id: '',
    activetime: '',

    createdAt: '',
    id: '',
    myid: '',
    updatedAt: '',
  };

  const SearchingFrom = () => {
    navigation.navigate('Active');
    Alert.alert('안녕하세요 ㅎ', '');
    navigation.navigate('Play', {undongDetail: undongDetail});
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
