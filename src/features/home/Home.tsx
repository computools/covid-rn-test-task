import React from 'react';
import {useQuery} from 'react-query';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootRoutes} from '../../navigation/root-stack/root-routes';
import {RootStackProps} from '../../navigation/root-stack/types';
import {DataItem} from '../../components/bar-chart/data-item';
import {GlobalStatCard} from './GlobalStatCard';
import {CountriesCard} from './CountriesCard';
import {CovidApi, SummaryOut} from '../../apis/covid/covid-api';

import {progressColor, styles} from './styles/home';

const buildStat = (global: SummaryOut['global']) => {
  const total: Array<DataItem> = [
    {
      id: 'TotalConfirmed',
      title: 'Confirmed',
      value: global.total.confirmed,
      color: '#3AC4FF',
    },
    {
      id: 'TotalDeaths',
      title: 'Deaths',
      value: global.total.deaths,
      color: '#FF565E',
    },
    {
      id: 'TotalRecovered',
      title: 'Recovered',
      value: global.total.recovered,
      color: '#00BFA6',
    },
  ];

  const today: Array<DataItem> = [
    {
      id: 'NewConfirmed',
      title: 'Confirmed',
      value: global.today.confirmed,
      color: '#3AC4FF',
    },
    {
      id: 'NewDeaths',
      title: 'Deaths',
      value: global.today.deaths,
      color: '#FF565E',
    },
    {
      id: 'NewRecovered',
      title: 'Recovered',
      value: global.today.recovered,
      color: '#00BFA6',
    },
  ];

  return {today, total};
};

export const Home: React.FC<RootStackProps<RootRoutes.Home>> = ({navigation}) => {
  const {isLoading, data} = useQuery('countriesSummary', CovidApi.getSummary);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.emptyScreenWrapper}>
        <ActivityIndicator color={progressColor} />
      </SafeAreaView>
    );
  }

  const {total, today} = buildStat(data!.global);

  return (
    <ScrollView style={styles.background} contentContainerStyle={styles.screenWrapper}>
      <CountriesCard onSeeMorePress={() => navigation.navigate(RootRoutes.AllCountries)} countries={data!.topFiveCountries} />
      <GlobalStatCard totalStat={total} todayStat={today} />
    </ScrollView>
  );
};
