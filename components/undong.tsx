import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {UndongItemType} from '../types/undong';
import StopWatch from './timer';
import Collapsible from 'react-native-collapsible';

const Undong = ({item}: {item: UndongItemType}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);
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
  const renderHeader = section => {
    return <View />;
  };
  const renderContent = section => {
    return (
      <Card.Content>
        <Text>
          운동 시작 시간 : {item.startdate.split(' ')[1].split(':')[0]}시{' '}
          {item.startdate.split(' ')[1].split(':')[1]}분{' '}
          {item.startdate.split(' ')[1].split(':')[2]}초
        </Text>
        <View style={{marginTop: 10}}>
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
    );
  };
  return (
    <View key={item.startdate} style={styles.itemView}>
      <Card style={[active && styles.toggleOnCard, styles.toggleOffCard]}>
        <Card.Content>
          <TextInput
            placeholder="운동이름을 써넣어주세요"
            // mode="outlined"
            onChangeText={text => OnchangeName(text)}
            value={undongDetail.name}
            style={styles.nameTextInput}
            right={<TextInput.Icon name="eye" onPress={EraseText} />}
          />

          <View
            style={{
              flex: 1,
              backgroundColor: ' blue',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>{getTimesFromMillis(elapsedTime).minutes.toString()} : </Text>
            <Text>{getTimesFromMillis(elapsedTime).seconds.toString()} </Text>
            {/* <Text>{getTimesFromMillis(elapsedTime).millis.toString()} </Text> */}
          </View>
          <Button onPress={() => setToggle(prev => !prev)}>펼치기</Button>

          <Collapsible collapsed={toggle}>
            <Card.Content>
              <Text>
                운동 시작 시간 : {item.startdate.split(' ')[1].split(':')[0]}시{' '}
                {item.startdate.split(' ')[1].split(':')[1]}분{' '}
                {item.startdate.split(' ')[1].split(':')[2]}초
              </Text>
              <View style={{marginTop: 10}}>
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
  toggleOnCard: {
    // height: 320,
    justifyContent: 'center',
  },
  toggleOffCard: {justifyContent: 'center'},
  cardContainer: {},
  nameTextInput: {width: '60%', backgroundColor: 'white'},
});

export default Undong;
