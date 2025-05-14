import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AuthStack, HomeStack } from './StackNavigation';
import { StatusBar } from 'react-native';

const MainNavigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
<>
      {isLoggedIn ? <HomeStack /> : <AuthStack />}
      </>
  );
};

export default MainNavigation;
