import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthProps} from '../routes';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';

const Authpage: React.FC<AuthProps> = ({}: AuthProps) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>여기는 로그인 페이지요 ㅎㅎ</Text>

      <View>
        <Button
          title="LOGIN"
          onPress={() =>
            dispatch(
              userSlice.actions.setUser({
                user: true,
              })
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Authpage;
