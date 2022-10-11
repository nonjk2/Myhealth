import React, {useCallback, useState} from 'react';
import {FlatList, Pressable, SafeAreaView, Text, View} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import {TabProps} from '../routes';
import {Card, Snackbar, TextInput} from 'react-native-paper';
import {format} from 'date-fns';
import Undong from '../components/playUndong/undong';
import {useAppDispatch, useAppSelector} from '../store';
import onToggle from '../slices/snack';
import {ResponseUndongArrayData} from '../types/Posts/posts';
import {ko} from 'date-fns/locale';
import {HEIGHT} from './home';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Myborder} from '../utils/myBorderLayout';

const WIDTH = Dimensions.get('window').width;

interface Props {
  type: number;
  id: number;
  key: string;
  title: string;
}

const ActivePage: React.FC<TabProps> = ({navigation}) => {
  const [undongData] = useState<ResponseUndongArrayData[]>([]);
  const [undongName, setUndongName] = useState<string>('');
  const snackToggle = useAppSelector(state => state.snack.toggle);
  const undongs = useAppSelector(state => state.exercise.undongs.undongs);
  const dispatch = useAppDispatch();

  const renderUndong = useCallback(
    ({item}: {item: ResponseUndongArrayData}) => {
      return <Undong item={item} navigation={navigation} />;
    },
    [navigation]
  );

  const OnchangeName = useCallback(
    (text: string) => {
      setUndongName(text);
    },
    [setUndongName]
  );

  // const EraseText = useCallback(() => {
  //   setUndongDetail({...undongDetail, name: ''});
  // }, [undongDetail]);

  const getStartUndong = useCallback(() => {
    const undongDetail: ResponseUndongArrayData = {
      startdate: format(Date.now(), 'HH:mm'),
      name: undongName,
      sets: [],
      __v: 0,
      _id: '',
      activetime: 0,
      createdAt: '',
      id: '',
      myid: '',
      updatedAt: '',
    };
    navigation.navigate('Play', {undongDetail: undongDetail});
    setUndongName('');
  }, [undongName, navigation]);
  return (
    <SafeAreaView style={styles.container}>
      {/* 운동 시작 카드 */}
      <Myborder title="운동 시작" />
      <Card style={{margin: 10}}>
        <View
          style={{
            height: HEIGHT * 0.15,
            backgroundColor: '#202020',
          }}>
          <TextInput
            onChangeText={text => OnchangeName(text)}
            value={undongName}
            mode={'outlined'}
            style={{margin: 2}}
            theme={{
              colors: {
                placeholder: '#b8b7b7',
                text: 'white',
                primary: '#bf5f5f',
                background: '#202020',
              },
            }}
            placeholderTextColor={'green'}
            label={'운동이름'}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 15,
            }}>
            <Pressable
              disabled={undongName.length === 0}
              onPress={() => {
                getStartUndong();
              }}>
              <Text
                style={{
                  color: undongName.length === 0 ? '#797777' : '#fff',
                  fontSize: 16,
                  fontWeight: '400',
                }}>
                시작하기
              </Text>
            </Pressable>
          </View>
        </View>
      </Card>
      {/* 오늘의 운동 */}
      <Myborder title={'오늘의 운동'} />
      <FlatList
        data={undongs.filter(
          e =>
            format(new Date(e.createdAt), 'yyyy-MM-dd') ===
            format(Date.now(), 'yyyy-MM-dd')
        )}
        keyExtractor={item => item.id}
        renderItem={renderUndong}
        style={{marginTop: 30}}
        extraData={undongData}
        ListHeaderComponent={() => {
          return (
            <View style={styles.headerCompo}>
              <Text style={styles.headerCompoFont}>
                {format(Date.now(), 'yyyy년 MM월 dd일 EEE요일', {locale: ko})}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                width: WIDTH,
                height: HEIGHT * 0.7,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IonIcon
                name={'alert-circle'}
                size={60}
                color={'#fff'}
                style={{marginBottom: 10}}
              />
              <Text style={{color: '#fff', fontWeight: '200'}}>
                오늘 운동이 없습니다
              </Text>
            </View>
          );
        }}
      />
      {/* 알림창 */}
      <Snackbar
        visible={snackToggle}
        onDismiss={() =>
          dispatch(onToggle.actions.exerciseCreate(false, 'Off'))
        }
        style={{position: 'absolute', bottom: 0}}
        duration={3000}
        action={{
          label: '닫기',
          onPress: () => {
            dispatch(onToggle.actions.exerciseCreate(false, 'Off'));
          },
        }}>
        운동이름을 넣어주세요!
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },

  toggleCurrentTime: {
    position: 'absolute',
    top: '5%',
    right: '85%',
  },
  toggleCurrentTimeOnoff: {
    position: 'absolute',
    top: '7%',
    right: '83%',
    color: 'red',
    fontSize: 14,
    fontWeight: '500',
  },
  headerCompo: {paddingLeft: 20},
  headerCompoFont: {color: '#fff', fontSize: 18},
  neonTimeOne: {},
  itemLabel: {
    alignSelf: 'center',
  },
  cardContainer: {
    alignSelf: 'center',
    position: 'relative',
    width: WIDTH,
    height: 60,
    backgroundColor: '#202020',
    top: 0,
    opacity: 0.9,
    marginVertical: 0,
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
