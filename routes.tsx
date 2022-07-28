import React, {Dispatch, SetStateAction} from 'react';
import {
  CompositeScreenProps,
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomePage from './pages/home';
import Authpage from './pages/Auth';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ProfilePage from './pages/profile';
import {useSelector} from 'react-redux';
import {RootState} from './store/reducer';
import ActivePage from './pages/active';
import TabButton from './components/customTab';

const items = [
  {
    activeIcon: 'calendar-outline',
    label: '홈',
    inactiveIcon: 'calendar',
  },
  {
    activeIcon: 'map-outline',
    label: '시작하기',
    inactiveIcon: 'map',
  },
  {
    activeIcon: 'person-circle-outline',
    label: '프로필',
    inactiveIcon: 'person-circle',
  },
];

export enum HomeScreens {
  Auth = 'Auth',
  Tab = 'Tab',
}
export enum TabScreens {
  Home = 'Home',
  Profile = 'Profile',
  Active = 'Active',
}
export type TabParamList = {
  Home: undefined;
  Active: undefined;
  Profile: undefined;
};
export type HomeParamList = {
  Auth: {setuser: Dispatch<SetStateAction<boolean>>};
  Tab: undefined;
};

export type AuthProps = NativeStackScreenProps<HomeParamList, 'Auth'>;
export type TabProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<HomeParamList>
>;

const Stack = createNativeStackNavigator<HomeParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const TabNav = (): React.ReactElement => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          right: 16,
          left: 16,
          borderRadius: 15,
          backgroundColor: '#85adfd',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowColor: '#000',
          shadowOpacity: 0.25,
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        name={TabScreens.Home}
        component={HomePage}
        options={{
          tabBarButton: props => <TabButton {...props} item={items[0]} />,
        }}
      />
      <Tab.Screen
        name={TabScreens.Active}
        component={ActivePage}
        options={{
          tabBarButton: props => <TabButton {...props} item={items[1]} />,
        }}
      />
      <Tab.Screen
        name={TabScreens.Profile}
        component={ProfilePage}
        options={{
          tabBarButton: props => <TabButton {...props} item={items[2]} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNav = (): React.ReactElement => {
  const user = useSelector((state: RootState) => !!state.user.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name={HomeScreens.Auth} component={Authpage} />
        ) : (
          <Stack.Screen
            name={HomeScreens.Tab}
            component={TabNav}
            options={{headerShown: false}}
          />
        )}
        {/* <Stack.Screen name={HomeScreens.Home} component={TabNav} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
