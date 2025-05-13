import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Public/Login';
import Otp from '../Screens/Public/Otp';
import HomeScreen from '../Screens/Private/HomeScreen';

export const AuthStack =()=>{

     
    const Stack = createNativeStackNavigator();
     return(
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown:false
        }}>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Otp' component={Otp}></Stack.Screen>
        <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>

     )
     
}