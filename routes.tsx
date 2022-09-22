import React, {Dispatch, SetStateAction} from 'react';
import {
  CompositeScreenProps,
  NavigationContainer,
  useNavigation,
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

import ActivePage from './pages/active';
import TabButton from './components/customTab';
import {useAppSelector} from './store';
import Playpage from './pages/play';

import {ResponseUndongArrayData} from './types/Posts/posts';
import CameraPage from './pages/camera';
import UndongStartButton from './components/playUndong/undongStartButton';

const items = [
  {
    activeIcon: 'calendar',
    label: '홈',
    inactiveIcon: 'calendar-outline',
  },
  {
    activeIcon: 'walk',
    label: '시작하기',
    inactiveIcon: 'walk-outline',
  },
  {
    activeIcon: 'camera',
    label: '사진',
    inactiveIcon: 'camera-outline',
  },
  {
    activeIcon: 'person',
    label: '프로필',
    inactiveIcon: 'person-outline',
  },
];

export enum HomeScreens {
  Auth = 'Auth',
  Tab = 'Tab',
  Play = 'Play',
}
export enum TabScreens {
  Home = 'Home',
  Profile = 'Profile',
  Active = 'Active',
  Camera = 'Camera',
  Empty = 'Empty',
}
export type TabParamList = {
  Home: undefined;
  Active: undefined;
  Profile: undefined;
  Camera: undefined;
  Empty: undefined;
};
export type HomeParamList = {
  Auth: {setuser: Dispatch<SetStateAction<boolean>>};
  Tab: undefined;
  Play: PlayParamList;
};

export type PlayParamList = {
  undongDetail: ResponseUndongArrayData;
};

export type AuthProps = NativeStackScreenProps<HomeParamList, 'Auth'>;
export type PlayProps = NativeStackScreenProps<HomeParamList, 'Play'>;
export type TabProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<HomeParamList>
>;
const EmptyScreenComponent = () => {
  return null;
};
const Stack = createNativeStackNavigator<HomeParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const TabNav = (): React.ReactElement => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
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
          headerShown: false,
          tabBarStyle: {backgroundColor: '#000', borderTopWidth: 0},
        }}
      />
      <Tab.Screen
        name={TabScreens.Active}
        component={ActivePage}
        options={{
          tabBarButton: props => <TabButton {...props} item={items[1]} />,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {backgroundColor: '#000', borderTopWidth: 0},
        }}
      />
      <Tab.Screen
        name={TabScreens.Empty}
        component={EmptyScreenComponent}
        options={{
          tabBarButton: () => <UndongStartButton navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name={TabScreens.Camera}
        component={CameraPage}
        options={{
          tabBarButton: props => <TabButton {...props} item={items[2]} />,
          tabBarStyle: {backgroundColor: '#000', borderTopWidth: 0},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={TabScreens.Profile}
        component={ProfilePage}
        options={{
          tabBarButton: props => <TabButton {...props} item={items[3]} />,
          tabBarStyle: {backgroundColor: '#000', borderTopWidth: 0},
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNav = (): React.ReactElement => {
  const user = useAppSelector(state => state.user.AccessToken);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name={HomeScreens.Auth}
            component={Authpage}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name={HomeScreens.Tab}
            component={TabNav}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name={HomeScreens.Play}
          component={Playpage}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name={HomeScreens.Home} component={TabNav} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
