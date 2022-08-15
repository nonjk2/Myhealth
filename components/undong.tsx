import React, {useCallback, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {UndongItemType, UndongType} from '../types/undong';
import StopWatch from './timer';
import Collapsible from 'react-native-collapsible';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../store';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

type undongProp = {
  item: UndongItemType;
  undongData: UndongType;
  setUndongData: React.Dispatch<React.SetStateAction<UndongType>>;
};
const Undong: React.FC<undongProp> = ({item, setUndongData, undongData}) => {
  const [elapsedTime, setElapsedTime] = useState(item.ActiveTime || 0);
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState<boolean>(true);
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
      <Card style={[active && styles.toggleOnCard]}>
        <Card.Content style={{backgroundColor: '#000'}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              // placeholder="운동이름을 써넣어주세요"
              mode="outlined"
              // collapsable={true}
              onChangeText={text => OnchangeName(text)}
              value={undongDetail.name}
              style={styles.nameTextInput}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: 'white',
                  // underlineColor: 'transparent',
                  background: '#000',
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

            <View style={styles.cardContainer}>
              <View style={styles.timer}>
                <Text style={styles.CardTimer}>
                  {format(new Date(elapsedTime), 'mm : ss ', {
                    locale: ko,
                  })}
                </Text>
              </View>
              <View style={styles.active}>
                <Text style={styles.CardTimer}>
                  {myexercise?.complete ? '운동완료' : '대기중'}
                </Text>
              </View>
            </View>
            <View>
              <IonIcon
                name={'close'}
                color={'#fff'}
                size={40}
                onPress={() => {
                  const FilterData = undongData.filter(
                    val => val.id !== item.id
                  );
                  setUndongData(FilterData);
                }}
              />
            </View>
          </View>
          <Button onPress={() => setToggle(prev => !prev)}>
            {toggle ? '펼치기' : '접기'}
          </Button>

          <Collapsible collapsed={toggle}>
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
          </Collapsible>
        </Card.Content>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  itemView: {marginBottom: 10},
  toggleOnCard: {},

  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContainerView: {
    backgroundColor: '#000',
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
  nameTextInput: {width: '60%', backgroundColor: '#000', color: '#fff'},
});

export default Undong;
