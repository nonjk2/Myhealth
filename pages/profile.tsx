import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {TabProps} from '../routes';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';

const ProfilePage: React.FC<TabProps> = ({route}) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>여기는 ㅎㅎㅎ {route.name} 페이지에요</Text>
      <Button
        title="LOG Out"
        onPress={() =>
          dispatch(
            userSlice.actions.setUser({
              user: false,
            })
          )
        }
      />
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

export default ProfilePage;
