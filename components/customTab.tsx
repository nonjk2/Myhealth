import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import IonIcon from 'react-native-vector-icons/Ionicons';
const animate1 = {
  0: {scale: 0.5, translateY: 0},
  1: {scale: 1.2, translateY: -8},
};
const animate2 = {
  0: {scale: 1.2, translateY: -8},
  1: {scale: 1, translateY: 0},
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
  0.3: {scale: 0.5},
  0.5: {scale: 0.7},
  0.8: {scale: 0.9},
  1: {scale: 1},
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
      circleRef.current.animate(circle);
    } else {
      viewRef.current.animate(plusanimate2);
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
    }
  }, [focused]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={1}>
      <Animatable.View style={styles.greeting} ref={viewRef} duration={300}>
        <Animatable.View
          style={focused ? styles.tabButtonFocus : styles.tabButton}
          ref={circleRef}
          duration={300}>
          <IonIcon
            name={focused ? item.activeIcon : item.inactiveIcon}
            size={34}
            color={focused ? '#101011' : '#fff'}
            style={{}}
          />
          <Text style={focused ? styles.tablabelFocus : styles.tablabel}>
            {item.label}
          </Text>
        </Animatable.View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', top: 13, alignItems: 'center'},
  greeting: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgb(147, 224, 228)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    // ...StyleSheet.absoluteFillObject,
    borderTopWidth: 0,
    borderColor: '#5585E8',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonFocus: {
    ...StyleSheet.absoluteFillObject,

    borderColor: '#000000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tablabel: {
    fontSize: 8,
    color: '#000',
    marginTop: 4,
  },
  tablabelFocus: {
    fontSize: 8,
    color: '#5585E8',
    marginTop: 1.5,
  },
});
export default TabButton;
