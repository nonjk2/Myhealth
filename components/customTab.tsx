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

const plusanimate2 = {
  0: {scale: 0.5, translateY: -10},
  1: {scale: 1.7, translateY: 0},
};
interface Prop extends BottomTabBarButtonProps {
  item: {
    activeIcon: string;
    label: string;
    inactiveIcon: string;
  };
}
const TabButton: React.FC<Prop> = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<any>(null);
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
        <IonIcon
          name={focused ? item.activeIcon : item.inactiveIcon}
          size={24}
          color={focused ? '#fff' : '#fff'}
          style={{}}
        />
      </Animatable.View>
      <Text style={focused ? styles.tablabelFocus : styles.tablabel}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  greeting: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    borderTopWidth: 0,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonFocus: {
    ...StyleSheet.absoluteFillObject,
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
    fontWeight: '200',
  },
  tablabelFocus: {
    fontSize: 11,
    fontWeight: '200',
    color: '#fff',
  },
});
export default TabButton;
