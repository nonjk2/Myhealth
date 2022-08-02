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
  return (
    <View key={item.startdate}>
      <Card style={[toggle && styles.toggleOnCard, styles.toggleOffCard]}>
        <Card.Actions>
          <TextInput
            placeholder="운동이름을 써넣어주세요"
            mode="outlined"
            onChangeText={text => OnchangeName(text)}
            value={name}
            style={styles.nameTextInput}
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
  toggleOnCard: {
    height: 320,
  },
  toggleOffCard: {},
  cardContainer: {},
  nameTextInput: {width: '60%'},
});

export default Undong;
