/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {format} from 'date-fns';
import React, {useCallback, useState} from 'react';
import {LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';
import {Card, List, Paragraph} from 'react-native-paper';
import {WIDTH} from '../pages/home';
import {ResponseUndongArrayData} from '../types/Posts/posts';

type CardProp = {
  item: ResponseUndongArrayData;
  index: number;
};
const RenderCard: React.FC<CardProp> = ({item}) => {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState(0);

  const onLayOut = useCallback(
    (e: LayoutChangeEvent) => {
      setHeight(e.nativeEvent.layout.height - 70);
    },
    [toggle]
  );
  return (
    <List.Item
      title={''}
      key={item.id}
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
                    {item.name}
                  </Paragraph>
                  <View>
                    <Paragraph
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: 'red',
                      }}>
                      {item.sets?.length}세트 완료
                    </Paragraph>
                  </View>
                </View>
                {toggle ? (
                  <List.Section>
                    <List.Subheader>
                      운동시간 : {item.activetime}
                    </List.Subheader>
                    {item.sets?.map((e, i) => (
                      <List.Item
                        style={{
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        key={e.time}
                        title={''}
                        description={`쉬는시간 : ${e.restTime}`}
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
                {item.startdate}
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
              {item.sets?.map(e => (
                <View
                  key={e.time}
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
                {format(new Date(item.createdAt), 'HH : mm')}
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
              {format(new Date(item.createdAt), 'HH : mm')}
            </Text>
            <Text
              style={{
                color: '#FF4000',
                fontSize: 16,
                fontWeight: '200',
              }}>
              {format(new Date(item.createdAt), 'EEE')}
            </Text>
          </View>
        )
      }
      style={{}}
    />
  );
};

export default RenderCard;
