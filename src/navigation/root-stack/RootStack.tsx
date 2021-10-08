import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../../features/home/Home';
import {RootStackParamList} from './types';
import {RootRoutes} from './root-routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={RootRoutes.Home} component={Home} />
  </Stack.Navigator>
);
