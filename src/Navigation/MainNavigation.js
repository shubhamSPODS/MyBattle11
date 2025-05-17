import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AuthStack, HomeStack } from './StackNavigation';
import { StatusBar } from 'react-native';
import { selectAuthToken } from '../Redux/Slice';

const MainNavigation = () => {
  const userToken = useSelector((state) => state.auth?.token);
  return (
    <>
      {userToken ? <HomeStack /> :<AuthStack />}     
       </>
  );
};

export default MainNavigation;
