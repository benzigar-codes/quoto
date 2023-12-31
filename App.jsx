// In App.js in a new project

import * as React from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {firebase} from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import Home from './src/screens/home';
import Create from './src/screens/create';
import Settings from './src/screens/settings';
import codePush from 'react-native-code-push';

import {PermissionsAndroid} from 'react-native';
import UpdateComponent from './src/components/UpdateComponent';

const Stack = createNativeStackNavigator();

function App() {
  const enableAnalytics = async () => {
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
  };

  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  };

  const checkForUpdates = () => {
    codePush.sync({
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
    });
  };

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {});
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    enableAnalytics();
    checkForUpdates();
    getToken();
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  return (
    <>
      <UpdateComponent />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: 'fade_from_bottom',
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(App);
