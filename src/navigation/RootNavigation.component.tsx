import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootStack} from './root-stack/RootStack.component';

export const RootNavigation = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
