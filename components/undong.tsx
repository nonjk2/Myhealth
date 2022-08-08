import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {UndongItemType} from '../types/undong';
import StopWatch from './timer';

const Undong = ({item}: {item: UndongItemType}) => {
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(false);
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
    <View key={item.startdate} style={styles.itemView}>
      <Card style={[toggle && styles.toggleOnCard, styles.toggleOffCard]}>
        <Card.Actions>
          <TextInput
            placeholder="운동이름을 써넣어주세요"
            // mode="outlined"
            onChangeText={text => OnchangeName(text)}
            value={undongDetail.name}
            style={styles.nameTextInput}
            right={<TextInput.Icon name="eye" onPress={EraseText} />}
          />
          <Button icon="chevron-down" onPress={() => setToggle(prev => !prev)}>
            자세히 보기
          </Button>
        </Card.Actions>
        {toggle ? (
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
              />
            </View>
          </Card.Content>
        ) : (
          <></>
        )}
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  itemView: {marginBottom: 10},
  toggleOnCard: {
    height: 320,
    justifyContent: 'center',
  },
  toggleOffCard: {justifyContent: 'center'},
  cardContainer: {},
  nameTextInput: {width: '60%', backgroundColor: 'white'},
});

export default Undong;
