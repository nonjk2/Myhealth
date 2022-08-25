import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import IonIcon from 'react-native-vector-icons/Ionicons';
const animate1 = {
  0: {scale: 0.5},
  1: {scale: 1.3},
};
const animate2 = {
  0: {scale: 1.2},
  1: {scale: 1},
};
// const plusanimate1 = {
//   0: {scale: 0.5, translateY: 0},
//   1: {scale: 1.7, translateY: -10},
// };
const plusanimate2 = {
  0: {scale: 0.5, translateY: -10},
  1: {scale: 1.7, translateY: 0},
};
const circle = {
  0: {scale: 1},
  0.3: {scale: 0.3},
  0.7: {scale: 0.5},
  1: {scale: 0.85},
  // 1: {scale: 0.9},
};
const circle2 = {0: {scale: 1}, 1: {scale: 1}};
interface Prop extends BottomTabBarButtonProps {
  item: {
    activeIcon: string;
    label: string;
    inactiveIcon: string;
  };
}
const TabButton: React.FC<Prop> = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      // circleRef.current.animate(circle);
    } else {
      viewRef.current.animate(plusanimate2);
      viewRef.current.animate(animate2);
      // circleRef.current.animate(circle2);
    }
  }, [focused]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={1}>
      <Animatable.View style={styles.greeting} ref={viewRef} duration={300}>
        {/* <Animatable.View
          style={focused ? styles.tabButtonFocus : styles.tabButton}
          ref={circleRef}
          duration={300}> */}
        <IonIcon
          name={focused ? item.activeIcon : item.inactiveIcon}
          size={24}
          color={focused ? '#101011' : '#fff'}
          style={{}}
        />
      </Animatable.View>
      {/* </Animatable.View> */}
      <Text style={focused ? styles.tablabelFocus : styles.tablabel}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', top: 13, alignItems: 'center'},
  greeting: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#85adfd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    // ...StyleSheet.absoluteFillObject,
    borderTopWidth: 0,
    // borderColor: '#5585E8',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonFocus: {
    ...StyleSheet.absoluteFillObject,
    // borderWidth: 3,
    top: -0.5,
    backgroundColor: '#fff',
    borderColor: '#85adfd',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tablabel: {
    fontSize: 11,
    color: '#fff',
    // marginTop: 4,
  },
  tablabelFocus: {
    fontSize: 11,
    color: '#fff',
    marginTop: 1.5,
  },
});
export default TabButton;
