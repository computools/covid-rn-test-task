import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AllCountries} from '../../features/all-countries/AllCountries';
import {Home} from '../../features/home/Home';
import {RootStackParamList} from './types';
import {RootRoutes} from './root-routes';
import {CountryDetails} from '../../features/country-details/CountryDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{title: 'COVID - 19'}} name={RootRoutes.Home} component={Home} />
    <Stack.Screen options={{title: 'Countries'}} name={RootRoutes.AllCountries} component={AllCountries} />
    <Stack.Screen options={({route}) => ({title: route.params.country.name})} name={RootRoutes.CountryDetails} component={CountryDetails} />
  </Stack.Navigator>
);
