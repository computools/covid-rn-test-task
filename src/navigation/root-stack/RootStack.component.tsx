import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CountryDetails} from '../../features/country-details/CountryDetails.component';
import {AllCountries} from '../../features/all-countries/AllCountries.component';
import {UserReportButton} from '../../components/user-report-button/UserReportButton.component';
import {UserReport} from '../../features/user-report/UserReport.component';
import {Home} from '../../features/home/Home.component';
import {RootStackParamList, RootStackProps} from './root-stack.types';
import {RootRoutes} from './root-routes.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const buildHomeOptions = ({navigation}: RootStackProps<RootRoutes.Home>) => ({
    title: 'COVID - 19',
    headerRight: () => <UserReportButton onPress={() => navigation.navigate(RootRoutes.UserReport)} />,
  });
  const buildDetailsOptions = ({route}: RootStackProps<RootRoutes.CountryDetails>) => ({title: route.params.country.name});

  return (
    <Stack.Navigator>
      <Stack.Screen options={buildHomeOptions} name={RootRoutes.Home} component={Home} />
      <Stack.Screen options={{title: 'Countries'}} name={RootRoutes.AllCountries} component={AllCountries} />
      <Stack.Screen options={buildDetailsOptions} name={RootRoutes.CountryDetails} component={CountryDetails} />
      <Stack.Screen options={{title: 'User COVID Report Form'}} name={RootRoutes.UserReport} component={UserReport} />
    </Stack.Navigator>
  );
};
