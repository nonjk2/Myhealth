// import {format} from 'date-fns';
// import {ko} from 'date-fns/locale';
// import React, {useState, useCallback, useEffect, useRef} from 'react';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {List} from 'react-native-paper';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import useInterval from '../../hooks/useInterval';
// import {useStopWatch} from '../../hooks/useStopWatch';
// import {WIDTH} from '../../pages/home';
// import exerciseSlice from '../../slices/exercise';
// import onToggle from '../../slices/snack';
// import {useAppDispatch} from '../../store';
// import {UndongItemType} from '../../types/undong';

// interface timestamp {
//   years: number;
//   weeks: number;
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
//   millis: number;
// }

// export type timerProps = {
//   undongDetail: UndongItemType;
// };

// export type labTime = {
//   time: number;
//   restTime: number;
//   activeTime: number;
// }[];
// const UndongsActivity: React.FC<timerProps> = ({undongDetail}) => {
//   const {
//     time,
//     isRunning,
//     start,
//     stop,
//     reset,
//     lap,
//     laps,
//     currentLapTime,
//     hasStarted,
//     slowestLapTime,
//     fastestLapTime,
//   } = useStopWatch();
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [active, setActive] = useState(false);
//   const [defalutRestTime, setDefalutRestTime] = useState(3000);
//   const [timer, setTimer] = useState(defalutRestTime);
//   const [startDate, setStartDate] = useState<any>(Date.now());
//   const [pausedTime, setPausedTime] = useState(0);
//   const [lapTimes, setLapTimes] = useState<labTime>(undongDetail.sets || []);
//   const [toggleTimer, setToggleTimer] = useState(false);
//   const pausedTimeRef = useRef(pausedTime);
//   const startDateRef = useRef<any>(startDate);
//   const activeRef = useRef(active);
//   const startTimeRef = useRef(0);
//   const leftTimeRef = useRef(0);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (timer <= 0) {
//       setToggleTimer(false);
//       setTimer(3000);
//     }
//   }, [defalutRestTime, timer]);

//   useEffect(() => {
//     activeRef.current = active;
//   }, [active]);
//   useEffect(() => {
//     startDateRef.current = startDate;
//   }, [startDate]);
//   useEffect(() => {
//     pausedTimeRef.current = pausedTime;
//   }, [pausedTime]);

//   const tick = useRef(() => {
//     const Timer = requestAnimationFrame(tick.current);
//     if (activeRef.current) {
//       setElapsedTime(Date.now() - startDateRef.current + pausedTimeRef.current);
//       Timer;
//     }
//   });

//   useEffect(() => {
//     if (toggleTimer) {
//       startTimeRef.current = Date.now();
//       leftTimeRef.current = timer;
//     } else if (!toggleTimer || timer < 0) {
//     }
//   }, [timer, toggleTimer]);
//   useEffect(() => {
//     if (active) {
//       requestAnimationFrame(tick.current);
//     }
//   }, [active]);

//   const handleStartClick = useCallback(() => {
//     if (!active) {
//       setActive(true);
//       start;
//       setStartDate(Date.now());
//     }
//   }, [active, start]);

//   const handleStopClick = useCallback(() => {
//     if (active) {
//       setActive(false);
//       setPausedTime(elapsedTime);
//       setToggleTimer(false);
//       stop;
//     }
//   }, [active, elapsedTime, stop]);

//   const handleLapTimeClick = useCallback(() => {
//     if (active) {
//       const newLapTimes: any = Array.from(lapTimes);
//       const timerSets = Date.now() - startDate + pausedTime;
//       const activeTime =
//         lapTimes.length === 0
//           ? timerSets
//           : timerSets -
//             lapTimes[lapTimes.length - 1].time -
//             lapTimes[lapTimes.length - 1].restTime;
//       newLapTimes.push({
//         time: timerSets,
//         restTime: timer,
//         activeTime: activeTime,
//       });
//       setLapTimes(newLapTimes);
//       setToggleTimer(true);
//     }
//   }, [active, lapTimes, pausedTime, startDate, timer]);

//   useInterval(
//     () => {
//       timeDecrement();
//     },
//     toggleTimer ? 1000 : null
//   );
//   const handleResetClick = useRef(() => {
//     setActive(false);
//     setStartDate(Date.now());
//     setElapsedTime(0);
//     setPausedTime(0);
//     setLapTimes([]);
//     setTimer(defalutRestTime);
//   });

//   const timeDecrement = () => {
//     const timePassed = Date.now() - startTimeRef.current;
//     setTimer(leftTimeRef.current - timePassed);
//   };
//   const addTime = (time: number) => {
//     setDefalutRestTime(prev => prev + time);
//     setTimer(prev => prev + time);
//     leftTimeRef.current += time;
//   };
//   const successAct = useCallback(() => {
//     if (undongDetail.name?.length === 0) {
//       dispatch(onToggle.actions.exerciseCreate(true, 'On'));
//     } else {
//       setActive(false);
//       dispatch(
//         exerciseSlice.actions.addUndong(true, undongDetail.id, {
//           id: undongDetail.id,
//           startdate: undongDetail.startdate,
//           ActiveTime: elapsedTime,
//           enddate: Date.now(),
//           name: undongDetail.name,
//           sets: lapTimes,
//         })
//       );
//     }
//   }, [
//     dispatch,
//     elapsedTime,
//     lapTimes,
//     setActive,
//     undongDetail.id,
//     undongDetail.name,
//     undongDetail.startdate,
//   ]);

//   return (
//     <View style={[]}>
//       {/* 쉬는시간 타이머 */}
//       <View style={styles.resttimer__area}>
//         <View style={styles.timer__time__area}>
//           <Text style={styles.timer__rest__text}>
//             {format(timer, 'mm', {
//               locale: ko,
//             }).charAt(0)}
//           </Text>
//         </View>
//         <View style={styles.timer__time__area}>
//           <Text style={styles.timer__rest__text}>
//             {format(timer, 'mm', {
//               locale: ko,
//             }).charAt(1)}
//           </Text>
//         </View>
//         <View style={styles.timer__symbol}>
//           <Text style={styles.timer__restsymbol__text}>:</Text>
//         </View>
//         <View style={styles.timer__time__area}>
//           <Text style={styles.timer__rest__text}>
//             {format(timer, 'ss', {
//               locale: ko,
//             }).charAt(0)}
//           </Text>
//         </View>
//         <View style={styles.timer__time__area}>
//           <Text style={styles.timer__rest__text}>
//             {format(timer, 'ss', {
//               locale: ko,
//             }).charAt(1)}
//           </Text>
//         </View>
//         <View style={styles.addtimerContainer}>
//           <TouchableOpacity
//             onPress={() => addTime(30000)}
//             style={styles.addtimerView}>
//             <Text style={styles.addtimerText}>+30</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => addTime(-30000)}>
//             <Text style={styles.addtimerText}>-30</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.tabbarContainer}>
//         <TouchableOpacity
//           onPress={active ? handleLapTimeClick : handleResetClick.current}
//           disabled={toggleTimer}
//           style={styles.icontabs}>
//           {active ? (
//             <Text style={styles.TextFont}>
//               {toggleTimer ? '쉬는시간 중...' : lapTimes.length + 1 + '세트 끝'}
//             </Text>
//           ) : (
//             <Text style={styles.TextFont}>재설정</Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={active ? handleStopClick : handleStartClick}
//           style={styles.icontabs}>
//           <IonIcon
//             size={32}
//             color="#fff"
//             name={active ? 'pause' : 'play-circle'}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={successAct} style={styles.icontabs}>
//           <Text style={styles.TextFont}>저장</Text>
//         </TouchableOpacity>
//       </View>
//       <View>
//         <List.Section>
//           <List.Subheader
//             style={{color: '#fff', fontSize: 24, fontWeight: '200'}}>
//             {undongDetail.name}
//           </List.Subheader>
//           {lapTimes.map((item, index) => {
//             return (
//               <List.Item
//                 key={item.time}
//                 title={format(new Date(item.time), 'mm : ss ', {
//                   locale: ko,
//                 })}
//                 right={() => (
//                   <View>
//                     <Text style={styles.labtimeIndex}>{index + 1}세트</Text>
//                     <Text style={styles.restText}>
//                       쉬는시간 : {format(item.restTime, 'mm : ss')}
//                     </Text>
//                     <Text style={styles.labtimeIndex}>
//                       운동시간 : {format(item.activeTime, 'mm : ss')}
//                     </Text>
//                   </View>
//                 )}
//                 titleStyle={{color: '#fff'}}
//                 left={() => <List.Icon icon="folder" color="#fff" />}
//                 style={styles.labtimeContainer}
//               />
//             );
//           })}
//         </List.Section>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   buttonSetting: {
//     flexDirection: 'row',
//   },
//   timeStamp: {
//     flexDirection: 'row',
//   },
//   tabbarContainer: {
//     flexDirection: 'row',
//     borderBottomColor: '#a3a3a3',
//     borderBottomWidth: 1,
//     height: 60,
//   },
//   TextFont: {color: '#fff'},
//   icontabs: {flex: 1, alignItems: 'center', justifyContent: 'center'},
//   RestBigtimerView: {
//     flexDirection: 'row',
//     width: 200,
//     backgroundColor: 'red',
//     paddingHorizontal: '15%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   BigtimerView: {
//     flexDirection: 'row',
//     width: WIDTH,
//   },
//   RestTimer: {
//     textAlign: 'center',
//     color: '#fff',
//   },
//   BigCardTimer: {
//     color: '#fff',
//     fontSize: 50,
//     fontWeight: '200',
//     textAlign: 'center',
//   },
//   timer__area: {
//     paddingRight: '5%',
//     justifyContent: 'center',
//     width: WIDTH,
//     flexDirection: 'row',
//   },
//   timer__time__area: {
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   timer__symbol: {marginHorizontal: 10},
//   timer__time__text: {
//     fontSize: 70,
//     width: 45,
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '200',
//   },
//   timer__symbol__text: {
//     fontSize: 60,
//     width: 10,
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '200',
//   },
//   resttimer__area: {
//     paddingRight: '5%',
//     justifyContent: 'center',
//     width: WIDTH,
//     left: 30,
//     flexDirection: 'row',
//   },
//   timer__rest__text: {
//     fontSize: 50,
//     width: 30,
//     textAlign: 'center',
//     color: 'red',
//     fontWeight: '200',
//   },
//   timer__restsymbol__text: {
//     fontSize: 40,
//     width: 10,
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '200',
//   },
//   addtimerContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     // alignSelf: 'flex-end',
//     left: 10,
//   },
//   addtimerView: {
//     backgroundColor: 'green',
//     borderRadius: 10,
//     width: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addtimerText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   restText: {
//     color: 'red',
//     marginRight: '15%',
//     paddingTop: 5,
//     fontSize: 15,
//   },
//   labtimeIndex: {color: '#fff', marginRight: '15%'},
//   labtimeContainer: {
//     borderColor: '#fff',
//     width: WIDTH * 0.9,
//   },
// });
// export default UndongsActivity;