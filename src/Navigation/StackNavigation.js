import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Public/Login';
import Otp from '../Screens/Public/Otp';
import TabNavigation from './TabNavigation';
import RummyGameMode from '../Screens/Private/RummyGameScreens/RummyGameMode';
import Setting from '../Screens/Private/Setting';
import ContestsScreen from '../Screens/Private/FantasyGameScreens/ContestsScreen';
import CreateTeamScreen from '../Screens/Private/FantasyGameScreens/CreateTeamScreen';
import SelectContestsScreen from '../Screens/Private/FantasyGameScreens/SelectContestsScreen';
import ScoreboardScreen from '../Screens/Private/FantasyGameScreens/ScoreboardScreen';
import ContestDetailsScreen from '../Screens/Private/FantasyGameScreens/ContestDetailsScreen';
import WebUrl from '../Screens/WebUrl';
import VerificationScreen from '../Screens/Private/VerificationScreen';
import VerifyBankAccountScreen from '../Screens/Private/VerifyBankAccountScreen';
import AadharVerification from '../Screens/Private/AadharVerification';
import GameTable from '../Screens/Private/Shared/GameTable';
import GameJoinTable from '../Screens/Private/Shared/GameJoinTable';
import LudoGameMode from '../Screens/Private/LudoGameScreens/LudoGameMode';

export const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
            <Stack.Screen name='Otp' component={Otp}></Stack.Screen>
            <Stack.Screen name='WebUrl' component={WebUrl}></Stack.Screen>

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
            <Stack.Screen name="GameTable" component={GameTable} />
            <Stack.Screen name="GameJoinTable" component={GameJoinTable} />
            <Stack.Screen name="LudoGameMode" component={LudoGameMode} />
            <Stack.Screen name="RummyGameMode" component={RummyGameMode} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="ContestsScreen" component={ContestsScreen} />
            <Stack.Screen name="CreateTeamScreen" component={CreateTeamScreen} />
            <Stack.Screen name="SelectContestsScreen" component={SelectContestsScreen} />
            <Stack.Screen name="ScoreboardScreen" component={ScoreboardScreen} />
            <Stack.Screen name="ContestDetailsScreen" component={ContestDetailsScreen} />
            <Stack.Screen name='WebUrl' component={WebUrl} />
            <Stack.Screen name='VerificationScreen' component={VerificationScreen} />
            <Stack.Screen name='VerifyBankAccountScreen' component={VerifyBankAccountScreen} />
            <Stack.Screen name='AadharVerification' component={AadharVerification} />





        </Stack.Navigator>

    )

}