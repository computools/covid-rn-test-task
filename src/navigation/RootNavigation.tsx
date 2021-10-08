import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootStack} from './root-stack/RootStack';

export const RootNavigation = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
