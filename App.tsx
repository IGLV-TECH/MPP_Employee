import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import QrCodeScanner from './src/QrCodeScanner'
import HomeScreen from './src/HomeScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="QrCodeScanner"
                  component={QrCodeScanner}
                  options={{title: 'Welcome'}}
              />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
};


const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

