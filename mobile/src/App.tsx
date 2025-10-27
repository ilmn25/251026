import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen.tsx';
import AboutScreen from './AboutScreen.tsx';
import DownloadScreen from './DownloadScreen.tsx';
const Stack = createNativeStackNavigator();

export const BACKEND_URL = 'https://untractable-genie-dreary.ngrok-free.dev';

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Download" component={DownloadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

