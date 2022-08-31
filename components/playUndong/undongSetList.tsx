import React from 'react';
import {StyleSheet, ScrollView, ViewStyle, View, Text} from 'react-native';
import {Card, Title} from 'react-native-paper';

import {LapData} from '../../hooks/useStopWatch';

const LapRow = ({
  lap,
  time,
  isFirst,
  currentRestTime,
}: {
  lap: number;
  currentRestTime?: string;
  time: string;
  isFirst: boolean;
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
          <Text style={styles.lapText}>{currentRestTime}</Text>
          <Text style={styles.lapText}>{time}</Text>
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
  currentRestTime: string;
  laps: LapData[];
};

export const LapList = ({
  hasStarted,
  currentLapTime,
  laps,
  currentRestTime,
}: LapListProps) => {
  return (
    <ScrollView style={styles.lapsContainer}>
      {hasStarted && (
        <LapRow
          time={currentLapTime}
          lap={laps.length + 1}
          isFirst
          currentRestTime={currentRestTime}
        />
      )}
      {laps.map(lapInfo => {
        return (
          <LapRow
            key={lapInfo.lap}
            time={lapInfo.time}
            lap={lapInfo.lap}
            currentRestTime={lapInfo.rest}
            isFirst={false}
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
