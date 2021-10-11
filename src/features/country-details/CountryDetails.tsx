import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootRoutes} from '../../navigation/root-stack/root-routes';
import {RootStackProps} from '../../navigation/root-stack/types';
import {TotalCard} from './TotalCard';

import {styles} from './styles/country-details';

export const CountryDetails: React.FC<RootStackProps<RootRoutes.CountryDetails>> = ({route}) => (
  <SafeAreaView style={styles.screeenWrapper}>
    <TotalCard country={route.params.country} />
  </SafeAreaView>
);
