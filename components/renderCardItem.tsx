/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {format} from 'date-fns';
import React, {useCallback, useState} from 'react';
import {LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';
import {Card, List, Paragraph} from 'react-native-paper';
import {WIDTH} from '../pages/home';
import {Undongitems} from '../slices/exercise';

type CardProp = {
  item: Undongitems;
  index: number;
};
const RenderCard: React.FC<CardProp> = ({item, index}) => {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState(0);

  const onLayOut = useCallback(
    (e: LayoutChangeEvent) => {
      console.log(e.nativeEvent.layout.height);
      setHeight(e.nativeEvent.layout.height - 70);
    },
    [toggle]
  );
  return (
    <List.Item
      title={''}
      key={index}
      right={() => (
        <TouchableOpacity onPress={() => setToggle(prev => !prev)}>
          <Card
            onLayout={onLayOut}
            style={{width: WIDTH * 0.72, marginRight: 5}}
            elevation={5}>
            <Card.Content>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Paragraph style={{fontSize: 14, fontWeight: '600'}}>
                    {item.undongDetail.name}
                  </Paragraph>
                  <View>
                    <Paragraph
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: 'red',
                      }}>
                      {item.undongDetail.sets?.length}세트 완료
                    </Paragraph>
                  </View>
                </View>
                {toggle ? (
                  <List.Section>
                    <List.Subheader>
                      운동시간 :{' '}
                      {format(item.undongDetail.ActiveTime, 'mm 분 ss 초')}
                    </List.Subheader>
                    {item.undongDetail.sets?.map((e, i) => (
                      <List.Item
                        style={{
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        key={e.activeTime}
                        title={''}
                        description={`쉬는시간 : ${format(
                          e.restTime,
                          'mm:ss'
                        )}`}
                        left={() => <Text>{i + 1}세트</Text>}
                      />
                    ))}
                  </List.Section>
                ) : null}
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      )}
      left={() =>
        toggle ? (
          <View
            style={{
              alignItems: 'center',
              //   justifyContent: 'space-between',
              backgroundColor: '#616161',
              // marginLeft: 20,
              width: WIDTH * 0.2,
            }}>
            {/* 시작 시간 */}
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#FF4000',
                  fontSize: 20,
                  fontWeight: '200',
                }}>
                {format(item.undongDetail.startdate, 'HH : mm')}
              </Text>
              <Text
                style={{
                  color: '#FF4000',
                  fontSize: 16,
                  fontWeight: '200',
                }}>
                Start
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                height: height,
                width: 8,
                borderRadius: 5,
                marginVertical: 5,
                shadowOpacity: 1,
                shadowColor: 'cyan',
                shadowRadius: 16,
                paddingTop: 35,
                alignItems: 'center',
              }}>
              {item.undongDetail.sets?.map(e => (
                <View
                  key={e.activeTime}
                  style={{
                    width: 60,
                    height: 30,
                    borderRadius: 5,
                    // backgroundColor: 'red',
                    marginVertical: 10,
                    marginTop: 12,
                  }}
                />
              ))}
            </View>

            {/* 끝나는 시간 */}
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#FF4000',
                  fontSize: 20,
                  fontWeight: '200',
                }}>
                {format(item.undongDetail.enddate, 'HH : mm')}
              </Text>
              <Text
                style={{
                  color: '#FF4000',
                  fontSize: 16,
                  fontWeight: '200',
                }}>
                End
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              //   justifyContent: 'center',
              backgroundColor: '#616161',
              // marginLeft: 20,
              width: WIDTH * 0.2,
            }}>
            <Text
              style={{
                color: '#FF4000',
                fontSize: 20,
                fontWeight: '200',
              }}>
              {format(item.id, 'HH : mm')}
            </Text>
            <Text
              style={{
                color: '#FF4000',
                fontSize: 16,
                fontWeight: '200',
              }}>
              {format(item.id, 'EEE')}
            </Text>
          </View>
        )
      }
      style={{}}
    />
  );
};

export default RenderCard;
