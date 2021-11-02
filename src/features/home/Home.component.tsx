import React from 'react';
import {useQuery} from 'react-query';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootRoutes} from '../../navigation/root-stack/root-routes.types';
import {RootStackProps} from '../../navigation/root-stack/root-stack.types';
import {CovidApi} from '../../apis/covid/covid-api';
import {DataItem} from '../../components/bar-chart/data-item.types';
import {GlobalStatCard} from './GlobalStatCard.component';
import {CountriesCard} from './CountriesCard.component';
import {Summary} from '../../apis/covid/dto/summary';
import {Country} from '../../apis/covid/dto/country';

import {progressColor, styles} from './styles/home.styles';

const buildStat = (global: Summary['Global']) => {
  const total: Array<DataItem> = [
    {
      id: 'TotalConfirmed',
      title: 'Confirmed',
      value: global.TotalConfirmed,
      color: '#3AC4FF',
    },
    {
      id: 'TotalDeaths',
      title: 'Deaths',
      value: global.TotalDeaths,
      color: '#FF565E',
    },
    {
      id: 'TotalRecovered',
      title: 'Recovered',
      value: global.TotalRecovered,
      color: '#00BFA6',
    },
  ];

  const today: Array<DataItem> = [
    {
      id: 'NewConfirmed',
      title: 'Confirmed',
      value: global.NewConfirmed,
      color: '#3AC4FF',
    },
    {
      id: 'NewDeaths',
      title: 'Deaths',
      value: global.NewDeaths,
      color: '#FF565E',
    },
    {
      id: 'NewRecovered',
      title: 'Recovered',
      value: global.NewRecovered,
      color: '#00BFA6',
    },
  ];

  return {today, total};
};

const startIndex = 0;
const topFive = 5;

export const Home: React.FC<RootStackProps<RootRoutes.Home>> = ({navigation}) => {
  const {isLoading, data} = useQuery('countriesSummary', CovidApi.getSummary);

  const goToCountryDetails = React.useCallback((country: Country) => navigation.navigate(RootRoutes.CountryDetails, {country}), [navigation]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.emptyScreenWrapper}>
        <ActivityIndicator color={progressColor} />
      </SafeAreaView>
    );
  }

  const {total, today} = buildStat(data!.Global);

  const handleSeeMore = () => navigation.navigate(RootRoutes.AllCountries);

  return (
    <ScrollView style={styles.background} contentContainerStyle={styles.screenWrapper}>
      <CountriesCard goToCountryDetails={goToCountryDetails} onSeeMorePress={handleSeeMore} countries={data!.Countries.slice(startIndex, topFive)} />
      <GlobalStatCard totalStat={total} todayStat={today} />
    </ScrollView>
  );
};
