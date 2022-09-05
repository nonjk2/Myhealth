import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

type MyButtonProps = {
  onPress: () => void;
  children: string;
  isRunning?: boolean;
  theme?: {
    btnColor: string;
    nagativeBtnColor: string;
    textColor?: string;
    nagativeTextColor?: string;
  };
  disabled?: boolean;
  isLoading?: boolean;
};

export const MyButton = ({
  onPress,
  children,
  isRunning,
  theme,
  disabled,
  isLoading,
}: MyButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      <View
        style={[
          styles.btnBorder,
          {
            borderColor: isRunning ? theme?.btnColor : theme?.nagativeBtnColor,
          },
        ]}>
        <View
          style={[
            styles.btn,
            {
              backgroundColor: isRunning
                ? theme?.btnColor
                : theme?.nagativeBtnColor,
            },
          ]}>
          {!isLoading ? (
            <Text
              style={[
                styles.text,
                {
                  color: isRunning
                    ? theme?.textColor
                    : theme?.nagativeTextColor,
                },
              ]}>
              {children}
            </Text>
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 75,
    height: 75,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBorder: {
    borderWidth: 2,
    padding: 3,
    borderRadius: 100,
  },

  text: {
    fontSize: 16,
    letterSpacing: 0.25,
    fontWeight: '600',
  },
});
