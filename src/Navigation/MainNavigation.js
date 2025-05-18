import React from 'react';
import { useSelector } from 'react-redux';
import { AuthStack, HomeStack } from './StackNavigation';

const MainNavigation = () => {
  const userToken = useSelector((state) => state.auth?.token);
  return (
    <>
      {userToken ? <HomeStack /> :<AuthStack />}     
       </>
  );
};

export default MainNavigation;
