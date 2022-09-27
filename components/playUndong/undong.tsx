import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, TextInput} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeParamList, TabParamList} from '../../routes';
import {WIDTH} from '../../pages/home';
import {ResponseUndongArrayData} from '../../types/Posts/posts';

type undongProp = {
  item: ResponseUndongArrayData;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Home', undefined>,
    NativeStackNavigationProp<HomeParamList, 'Play'>
  >;
};
const Undong: React.FC<undongProp> = ({item}) => {
  const [undongDetail, setUndongDetail] = useState(item);
  const OnchangeName = useCallback(
    (text: any) => {
      setUndongDetail({...undongDetail, name: text});
    },
    [undongDetail]
  );
  const refreshName = useCallback(() => {
    setUndongDetail(item);
  }, [item]);

  // 업데이트 //

  // const updateUndong = useCallback(()=> {},[]);

  // 삭제 //

  // const deleateUndong = useCallback(()=> {}, []);
  return (
    <View style={styles.itemView}>
      <Card style={[styles.toggleOnCard]}>
        <Card.Content style={{backgroundColor: '#202020'}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              mode="outlined"
              onChangeText={text => OnchangeName(text)}
              value={undongDetail.name}
              style={styles.nameTextInput}
              theme={{
                colors: {
                  placeholder:
                    undongDetail.name === item.name ? '#b8b7b7' : 'red',
                  text: 'white',
                  primary: undongDetail.name === item.name ? 'white' : 'red',
                  background: '#202020',
                },
              }}
              // activeUnderlineColor={'red'}
              // activeOutlineColor={'red'}
              label="운동이름"
              right={
                undongDetail.name ? (
                  <TextInput.Icon
                    name="refresh"
                    color="white"
                    onPress={refreshName}
                  />
                ) : null
              }
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 15,
              }}>
              <IonIcon
                name={'close'}
                color={'#fff'}
                size={24}
                style={{marginHorizontal: 5, marginLeft: 15}}
                onPress={() => {
                  // deleateUndong();
                }}
              />
              <IonIcon
                name={'build'}
                color={undongDetail.name === item.name ? '#3c3c3c' : '#fff'}
                size={20}
                style={{marginHorizontal: 5}}
                onPress={() => {
                  // deleteUndong();
                }}
              />
            </View>
          </View>
          <View style={{alignItems: 'center', top: 10}}>
            {undongDetail.name === item.name ? null : (
              <Text style={{color: 'white'}}>수정중</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  itemView: {},
  toggleOnCard: {},

  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContainerView: {
    backgroundColor: '#202020',
    width: WIDTH,
  },
  active: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  CardTimer: {
    color: 'white',
    fontSize: 20,
  },
  nameTextInput: {width: '70%', backgroundColor: '#202020', color: '#fff'},
});

export default Undong;
