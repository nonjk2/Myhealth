import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {UndongType} from '../types/undong';

type Props = {
  undongData: UndongType;
};

const Undong: React.FC<Props> = ({undongData}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <View>
      {undongData.map((item, index) => (
        <TouchableOpacity
          key={item.startdate + index}
          onPress={() => setToggle(prev => !prev)}>
          <Card style={[toggle && styles.toggleOnCard, styles.toggleOffCard]}>
            <Card.Actions>
              <Button>{item.startdate}</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  toggleOnCard: {
    height: 120,
  },
  toggleOffCard: {},
});

export default Undong;
