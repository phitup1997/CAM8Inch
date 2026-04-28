import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './StackNavigation';
import {navigationRef} from './NavigationService';

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigation />
    </NavigationContainer>
  );
}

export default AppNavigator;
