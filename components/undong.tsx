import React, {useCallback, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {UndongItemType, UndongType} from '../types/undong';
import StopWatch from './timer';
import Collapsible from 'react-native-collapsible';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../store';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeParamList, TabParamList} from '../routes';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
  const [elapsedTime, setElapsedTime] = useState(item.ActiveTime || 0);
  const [active, setActive] = useState(false);
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
  const myexercise = useAppSelector(state =>
    state.exercise.find(e => e.id === item.id)
  );
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
                  // underlineColor: 'transparent',
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

          {/* <Collapsible collapsed={toggle}>
            <Card.Content
              style={{height: HEIGHT, width: WIDTH, alignItems: 'center'}}>
              <View style={styles.cardContainerView}>
                <StopWatch
                  undongDetail={undongDetail}
                  setUndongDetail={setUndongDetail}
                  active={active}
                  setActive={setActive}
                  elapsedTime={elapsedTime}
                  setElapsedTime={setElapsedTime}
                />
              </View>
            </Card.Content>
          </Collapsible> */}
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
