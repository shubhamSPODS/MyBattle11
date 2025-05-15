import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Public/Login';
import Otp from '../Screens/Public/Otp';
import HomeScreen from '../Screens/Private/HomeScreen';
import TabNavigation from './TabNavigation';
import LudoGameMode from '../Screens/Private/LudoGameScreens/LudoGameMode';
import LudoTable from '../Screens/Private/LudoGameScreens/LudoTable';
import LudoJoinTable from '../Screens/Private/LudoGameScreens/LudoJoinTable';
import RummyGameMode from '../Screens/Private/RummyGameScreens/RummyGameMode';
import RummyPoolTables from '../Screens/Private/RummyGameScreens/RummyPoolTables';
import RummyJoinGame from '../Screens/Private/RummyGameScreens/RummyJoinGame';
import Setting from '../Screens/Private/Setting';

export const AuthStack = () => {


    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
            <Stack.Screen name='Otp' component={Otp}></Stack.Screen>
        </Stack.Navigator>

    )

}


export const HomeStack = () => {


    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Tabs' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Tabs" component={TabNavigation} />

            <Stack.Screen name="LudoGameMode" component={LudoGameMode} />
            <Stack.Screen name="LudoTable" component={LudoTable} />
            <Stack.Screen name="LudoJoinTable" component={LudoJoinTable} />
            <Stack.Screen name="RummyGameMode" component={RummyGameMode} />
            <Stack.Screen name="RummyPoolTables" component={RummyPoolTables} />
            <Stack.Screen name="RummyJoinGame" component={RummyJoinGame} />
            <Stack.Screen name="Setting" component={Setting} />




        </Stack.Navigator>

    )

}