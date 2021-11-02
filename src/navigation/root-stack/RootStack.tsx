import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CountryDetails} from '../../features/country-details/CountryDetails';
import {AllCountries} from '../../features/all-countries/AllCountries';
import {UserReportButton} from '../../components/user-report-button/UserReportButton.component';
import {UserReport} from '../../features/user-report/UserReport';
import {Home} from '../../features/home/Home';
import {RootStackParamList} from './types';
import {RootRoutes} from './root-routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={({navigation}) => ({
        title: 'COVID - 19',
        headerRight: () => <UserReportButton onPress={() => navigation.navigate(RootRoutes.UserReport)} />,
      })}
      name={RootRoutes.Home}
      component={Home}
    />
    <Stack.Screen options={{title: 'Countries'}} name={RootRoutes.AllCountries} component={AllCountries} />
    <Stack.Screen options={({route}) => ({title: route.params.country.name})} name={RootRoutes.CountryDetails} component={CountryDetails} />
    <Stack.Screen options={{title: 'User COVID Report Form'}} name={RootRoutes.UserReport} component={UserReport} />
  </Stack.Navigator>
);
