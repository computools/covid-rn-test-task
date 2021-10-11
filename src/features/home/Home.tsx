import React from 'react';
import {useQuery} from 'react-query';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SummaryResponse} from '../../models/dtos/summary-response';
import {RootStackProps} from '../../navigation/root-stack/types';
import {ChartCard, DataItem} from '../../components/chart-card';
import {CountriesCard} from './CountriesCard';
import {Country} from '../../models/country';

import {padding, progressColor, styles} from './styles/home';

const startIndex = 0;
const endIndex = 5;

export const Home: React.FC<RootStackProps> = () => {
  const {isLoading, data} = useQuery<SummaryResponse>('countriesSummary', () => fetch('https://api.covid19api.com/summary').then(res => res.json()));

  if (isLoading) {
    return (
      <SafeAreaView style={styles.emptyScreenWrapper}>
        <ActivityIndicator color={progressColor} />
      </SafeAreaView>
    );
  }

  const countries = data!.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
    .slice(startIndex, endIndex)
    .map(Country.parse);

  const globalStat: Array<DataItem> = [
    {
      id: 'TotalConfirmed',
      title: 'Confirmed',
      value: data!.Global.TotalConfirmed,
      color: '#3AC4FF',
    },
    {
      id: 'TotalDeaths',
      title: 'Deaths',
      value: data!.Global.TotalDeaths,
      color: '#FF565E',
    },
    {
      id: 'TotalRecovered',
      title: 'Recovered',
      value: data!.Global.TotalRecovered,
      color: '#00BFA6',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screenWrapper}>
      <CountriesCard countries={countries} />
      <ChartCard data={globalStat} paddingHorizontal={padding} />
    </ScrollView>
  );
};
