import {differenceInCalendarDays, format} from 'date-fns';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';
import ImageModal from 'react-native-image-modal';

// import {useAppDispatch} from '../store';
import {Avatar, Card, Title} from 'react-native-paper';
import {useAppSelector} from '../store';

function ProfilePage() {
  const undongs = useAppSelector(state => state.exercise.undongs.undongs);
  const undongsImg = useAppSelector(state => state.exercise.undongs.undongimg);
  const [myImgNumber, setmyImgNumber] = useState(0);
  const onViewRef = useRef(({viewableItems}: any) => {
    console.log(viewableItems[0].index);
    setmyImgNumber(viewableItems[0].index + 1);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const myundongAllDay = undongs
    .map(e => format(new Date(e.createdAt), 'yyyy-MM-dd'))
    .sort()
    .filter((e, i, arr) => arr.indexOf(e) === i).length;
  const offset = 260;
  const firstundong =
    undongs.length !== 0
      ? format(new Date(undongs[0].createdAt), 'yyyy-MM-dd')
      : '없음';
  const firstundongDiffDay =
    undongs.length !== 0
      ? differenceInCalendarDays(new Date(undongs[0].createdAt), Date.now())
      : '없음';
  const lastundong =
    undongs.length !== 0
      ? format(new Date(undongs[undongs.length - 1].createdAt), 'yyyy-MM-dd')
      : '없음';

  const averageMyundong =
    undongs.length !== 0
      ? undongs.reduce(
          (sum, acc) => (sum + acc.activetime) / 60 / 1000 / myundongAllDay,
          0
        )
      : 0;
  const renderUndongsImg = ({item}: any) => {
    return (
      <View style={{marginHorizontal: 5}}>
        <ImageModal
          style={{
            width: 250,
            height: 250,
          }}
          resizeMode="contain"
          imageBackgroundColor="#000000"
          source={{
            uri: `https://${Config.AWS_S3_BUCKET_NAME}.s3.${Config.AWS_S3_REGION}.amazonaws.com/${item.imgUrl}`,
          }}
        />
      </View>
    );
  };
  const snapToOffsets = useMemo(
    () => undongsImg.map((item, index) => index * offset),
    [undongsImg]
  );
  const myActs = (a: string, b: string) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 40,
        }}>
        <View>
          <Text style={{fontSize: 18, fontWeight: '500', lineHeight: 20}}>
            {a}
          </Text>
          <Text
            style={{
              color: '#a39f9f',
              lineHeight: 20,
              fontSize: 14,
              fontWeight: '200',
            }}>
            {b}
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    // console.log(flatlistRef);
  }, []);

  return (
    <ScrollView style={styles.profileContainer}>
      <View
        style={{
          height: 200,
          backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'center',
          shadowOffset: {
            height: 0,
            width: 10,
          },
          shadowOpacity: 0.4,
        }}>
        <Avatar.Image
          size={72}
          source={{
            uri: 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927',
          }}
          style={{alignSelf: 'flex-end', top: 36}}
        />
      </View>

      <View style={{}}>
        {/* 자기소개 */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 120,
          }}>
          <Text style={styles.nameFont}>최은석입니다</Text>
          <Text>안녕하세요</Text>
        </View>

        {/* 내 활동 */}
        <View style={{marginVertical: 15}}>
          <Card style={styles.cardContainer}>
            <Card.Content style={{flex: 1}}>
              <View style={{flex: 1, paddingLeft: 20}}>
                <Title>내 활동</Title>
                <Text
                  style={{color: '#757272', fontSize: 14, fontWeight: '200'}}>
                  첫 운동을 시작하고나서 {`${firstundongDiffDay}일`}
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    paddingTop: 30,
                  }}>
                  {myActs(`${myundongAllDay}일`, '운동일수')}
                  {myActs(
                    `${Math.round(averageMyundong)}분`,
                    '하루평균운동시간(분)'
                  )}
                </View>
                <View
                  style={{
                    flex: 2,
                    height: 130,
                    justifyContent: 'center',
                    paddingTop: 30,
                  }}>
                  {myActs(`${firstundong}`, '처음운동')}
                  {myActs(`${lastundong}`, '마지막운동')}
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
        {/* 내 사진  */}
        <View style={{flex: 2, marginBottom: 10}}>
          <Card style={styles.cardContainer}>
            <Card.Content style={{flex: 1}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Title style={{paddingLeft: 20, marginBottom: 5}}>
                    내 사진
                  </Title>
                  <Text style={{justifyContent: 'center'}}>
                    {myImgNumber}/{undongsImg.length}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    data={undongsImg}
                    renderItem={renderUndongsImg}
                    horizontal
                    snapToOffsets={snapToOffsets}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  nameFont: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 30,
  },
  cardContainer: {
    borderStartColor: '#fff',
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20,
  },
});

export default ProfilePage;
