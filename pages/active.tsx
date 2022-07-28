import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabProps} from '../routes';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const exerciseData = [
  {
    type: 1,
    id: 1,
    key: '메인1',
    title: '스트레칭',
  },
  {
    type: 1,
    id: 2,
    key: '메인2',
    title: '유산소운동',
  },
  {
    type: 1,
    id: 3,
    key: '메인3',
    title: '스트렝스 & 기구',
  },
  {
    type: 1,
    id: 4,
    key: '메인4',
    title: '맨몸 운동',
  },
];
interface Props {
  type: number;
  id: number;
  key: string;
  title: string;
}
const ActivePage: React.FC<TabProps> = ({route}: TabProps) => {
  const [ActiveType, setActiveType] = useState('');

  const ActiveSetting = (item: Props) => {
    setActiveType(item.title);
  };

  const Myitems = useCallback((item: Props) => {
    return (
      <View style={styles.viewContainer}>
        <TouchableOpacity
          onPress={() => ActiveSetting(item)}
          activeOpacity={0.7}
          style={styles.itemsContainer}>
          <Avatar.Text label="J" />
          <Text style={styles.itemLabel}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  const keyExtractor = useCallback((item: {id: any}) => {
    return item.id;
  }, []);

  return (
    <View style={styles.container}>
      {ActiveType === '' ? (
        <FlatList
          data={exerciseData}
          renderItem={({item}) => Myitems(item)}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          numColumns={2}
        />
      ) : (
        <View>
          <Text>{ActiveType}</Text>
          <TouchableOpacity onPress={() => setActiveType('')}>
            <IonIcon name="arrow-back" size={22} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  viewContainer: {
    backgroundColor: '#fdd',
    width: WIDTH * 0.48,
    height: HEIGHT * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    marginVertical: 5,
  },
  itemLabel: {
    alignSelf: 'center',
  },
  itemsContainer: {
    height: WIDTH * 0.2,
    width: WIDTH * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cicletext: {
    width: '80%',
    height: '80%',
    backgroundColor: 'red',
    borderRadius: WIDTH * 0.1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default ActivePage;
