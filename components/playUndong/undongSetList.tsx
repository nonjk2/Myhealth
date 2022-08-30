import React from 'react';
import {StyleSheet, ScrollView, ViewStyle, View, Text} from 'react-native';
import {Card, Title} from 'react-native-paper';

import {LapData} from '../../hooks/useStopWatch';

const LapRow = ({
  lap,
  time,
  isFirst,
  isRest,
  restTime,
  rest,
}: {
  lap: number;
  currentRestTime?: string;
  time?: string;
  restTime?: string;
  isFirst: boolean;
  isRest: boolean;
  rest?: string;
  style?: 'green' | 'red';
}) => {
  const rowStyles: ViewStyle[] = [styles.lapRow];
  const cardStyles: ViewStyle[] = [styles.lapRowCard];
  if (isFirst) {
    cardStyles.push({backgroundColor: '#0eb743b9'});
  }

  return (
    <Card style={cardStyles} elevation={5}>
      <Card.Content>
        <View style={rowStyles}>
          <Title>{lap}set</Title>
          <Text style={styles.lapText}>{isRest ? rest : restTime}</Text>
          {/* //왼쪽// */}
          <Text style={styles.lapText}>{isRest ? restTime : time}</Text>
          {/* //오른쪽// */}
        </View>
      </Card.Content>
    </Card>
  );
};

type LapListProps = {
  hasStarted: boolean;
  currentLapTime: string;
  fastestLapTime: string;
  slowestLapTime: string;
  isRest: boolean;
  currentRestTime: string;
  restTime: string;
  laps: LapData[];
};

export const LapList = ({
  hasStarted,
  currentLapTime,
  laps,
  isRest,
  restTime,
  currentRestTime,
}: LapListProps) => {
  return (
    <ScrollView style={styles.lapsContainer}>
      {hasStarted && (
        <LapRow
          time={currentLapTime}
          lap={laps.length + 1}
          isFirst
          isRest={isRest}
          rest={currentRestTime}
          restTime={restTime}
        />
      )}
      {laps.map(lapInfo => {
        return (
          <LapRow
            key={lapInfo.lap}
            restTime={lapInfo.rest}
            time={lapInfo.time}
            rest={lapInfo.time}
            lap={lapInfo.lap}
            isFirst={false}
            isRest={false}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lapsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 5,
    marginTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
  },
  lapRowCard: {
    marginTop: 10,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lapText: {
    fontSize: 18,
    fontVariant: ['tabular-nums'], // fixed width character
  },
});
