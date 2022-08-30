import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, TextInput} from 'react-native-paper';
import {UndongItemType, UndongType} from '../../types/undong';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeParamList, TabParamList} from '../../routes';
import {WIDTH} from '../../pages/home';

type undongProp = {
  item: UndongItemType;
  undongData: UndongType;
  setUndongData: React.Dispatch<React.SetStateAction<UndongType>>;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Home', undefined>,
    NativeStackNavigationProp<HomeParamList, 'Play'>
  >;
};
const Undong: React.FC<undongProp> = ({
  navigation,
  item,
  setUndongData,
  undongData,
}) => {
  const [undongDetail, setUndongDetail] = useState(item);
  const OnchangeName = useCallback(
    (text: any) => {
      setUndongDetail({...undongDetail, name: text});
    },
    [undongDetail]
  );
  const EraseText = useCallback(() => {
    setUndongDetail({...undongDetail, name: ''});
  }, [undongDetail]);
  return (
    <View style={styles.itemView}>
      <Card style={[styles.toggleOnCard]}>
        <Card.Content style={{backgroundColor: '#202020'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TextInput
              mode="outlined"
              onChangeText={text => OnchangeName(text)}
              value={undongDetail.name}
              style={styles.nameTextInput}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: 'white',
                  background: '#202020',
                },
              }}
              underlineColor={'#fff'}
              selectionColor={'#fff'}
              placeholderTextColor={'#fff'}
              activeOutlineColor={'#fff'}
              activeUnderlineColor={'#fff'}
              label="운동이름"
              outlineColor="#fff"
              right={
                undongDetail.name ? (
                  <TextInput.Icon
                    name="close"
                    color="white"
                    onPress={EraseText}
                  />
                ) : null
              }
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <IonIcon
                name={'close'}
                color={'#fff'}
                size={28}
                style={{marginHorizontal: 10}}
                onPress={() => {
                  const FilterData = undongData.filter(
                    val => val.id !== item.id
                  );
                  setUndongData(FilterData);
                }}
              />
              <IonIcon
                name={'play'}
                color={undongDetail.name?.length === 0 ? '#3c3c3c' : '#fff'}
                size={28}
                style={{marginHorizontal: 5}}
                onPress={() => {
                  navigation.navigate('Play', {
                    undongDetail: undongDetail,
                  });
                }}
              />
            </View>
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
