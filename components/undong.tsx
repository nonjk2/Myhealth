import React, {useCallback, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {UndongItemType} from '../types/undong';
import StopWatch from './timer';
import Collapsible from 'react-native-collapsible';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Undong = ({item}: {item: UndongItemType}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState<boolean>(true);
  const [undongDetail, setUndongDetail] = useState(item);
  const OnchangeName = useCallback(
    (text: any) => {
      setUndongDetail({...undongDetail, name: text});
    },
    [undongDetail]
  );
  const MemoStopWatch = React.memo(StopWatch);
  const EraseText = useCallback(() => {
    setUndongDetail({...undongDetail, name: ''});
  }, [undongDetail]);

  const getTimesFromMillis: any = (source: number) => {
    const timeUnits = [
      ['millis', 1000],
      ['seconds', 60],
      ['minutes', 60],
      ['hours', 24],
      ['days', 7],
      ['weeks', 52],
      ['years'],
    ];

    return timeUnits.reduce((acc, [unitKey, unitValue]: any) => {
      if (unitValue) {
        const value = source % unitValue;
        source = (source - value) / unitValue;
        return Object.assign({}, acc, {[unitKey]: value});
      }
      return Object.assign({}, acc, {[unitKey]: source});
    }, {});
  };

  return (
    <View key={item.startdate} style={styles.itemView}>
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
                  {active ? '운동중' : '대기중'}
                </Text>
              </View>
            </View>
          </View>
          <Button onPress={() => setToggle(prev => !prev)}>
            {toggle ? '펼치기' : '접기'}
          </Button>

          <Collapsible collapsed={toggle}>
            <Card.Content
              style={{height: HEIGHT, width: WIDTH, alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <View style={styles.Bigtimer}>
                  <Text style={styles.BigCardTimer}>
                    {format(new Date(elapsedTime), 'mm : ss : SS', {
                      locale: ko,
                    })}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  flex: 5,
                  backgroundColor: '#000',
                  width: WIDTH,
                }}>
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
  Bigtimer: {
    flexDirection: 'row',
    flex: 1,
    width: WIDTH,
    backgroundColor: '#000',
    paddingHorizontal: '15%',
  },
  BigCardTimer: {
    color: '#fff',
    fontSize: 50,
    fontWeight: '200',
  },
  CardTimer: {
    color: 'white',
  },
  nameTextInput: {width: '60%', backgroundColor: '#000', color: '#fff'},
});

export default Undong;
