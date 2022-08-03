import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {UndongItemType} from '../types/undong';

const Undong = ({item}: {item: UndongItemType}) => {
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState(item.name);
  const OnchangeName = useCallback((text: any) => {
    setName(text);
  }, []);

  const EraseText = useCallback(() => {
    setName('');
  }, []);
  return (
    <View key={item.startdate} style={styles.itemView}>
      <Card style={[toggle && styles.toggleOnCard, styles.toggleOffCard]}>
        <Card.Actions>
          <TextInput
            placeholder="운동이름을 써넣어주세요"
            mode="outlined"
            onChangeText={text => OnchangeName(text)}
            value={name}
            style={styles.nameTextInput}
            right={<TextInput.Icon name="eye" onPress={EraseText} />}
          />
          <Button icon="chevron-down" onPress={() => setToggle(prev => !prev)}>
            자세히 보기
          </Button>
        </Card.Actions>
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
  nameTextInput: {width: '60%'},
});

export default Undong;
