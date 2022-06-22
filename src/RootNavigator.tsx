import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AnimatedScroll3D from './AnimatedScroll';
import AnimatedScrollTranslateX from './AnimatedScrollTranslateX';
import AnimatedTopTab from './AnimatedTopTab';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AnimatedScroll3D" component={AnimatedScroll3D} />
        <Stack.Screen
          name="AnimatedScrollTranslateX"
          component={AnimatedScrollTranslateX}
        />
        <Stack.Screen name="AnimatedTopTab" component={AnimatedTopTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
