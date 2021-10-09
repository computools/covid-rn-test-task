import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';

import {RootStackProps} from '../../navigation/root-stack/types';
import {CountriesCard} from './CountriesCard';

import {styles} from './styles/home';
import {ActivityIndicator} from 'react-native';
import {SummaryResponse} from '../../models/dtos/summary-response';
import {Country} from '../../models/country';

const startIndex = 0;
const endIndex = 4;

export const Home: React.FC<RootStackProps> = () => {
  const {isLoading, data} = useQuery<SummaryResponse>('countriesSummary', () => fetch('https://api.covid19api.com/summary').then(res => res.json()));

  return (
    <ScrollView contentContainerStyle={styles.screenWrapper}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <CountriesCard
          countries={data!.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
            .slice(startIndex, endIndex)
            .map(Country.parse)}
        />
      )}
    </ScrollView>
  );
};
