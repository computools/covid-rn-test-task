import React from 'react';
import {useQuery} from 'react-query';
import {ActivityIndicator, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootRoutes} from '../../navigation/root-stack/root-routes';
import {RootStackProps} from '../../navigation/root-stack/types';
import {CovidApi} from '../../apis/covid/covid-api';
import {TotalCard} from './TotalCard';
import {ChartCard} from './ChartCard';

import {padding, styles} from './styles/country-details';
import {ScrollView} from 'react-native-gesture-handler';

export const CountryDetails: React.FC<RootStackProps<RootRoutes.CountryDetails>> = ({route}) => {
  const {isLoading, data} = useQuery('oneDay', () => CovidApi.getDayOneStatByCountry(route.params.country.slug));

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.screeenWrapper}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <TotalCard country={route.params.country} />
        <View style={styles.chartsRow}>
          <ChartCard padding={padding} title="Confirmed" data={data!.map(e => ({xValue: e.confirmed, yValue: e.date.getTime()}))} color="#FF8A34" />
          <ChartCard padding={padding} title="Active" data={data!.map(e => ({xValue: e.active, yValue: e.date.getTime()}))} color="#3AC4FF" />
        </View>
        <View style={styles.chartsRow}>
          <ChartCard padding={padding} title="Recovered" data={data!.map(e => ({xValue: e.recovered, yValue: e.date.getTime()}))} color="#00BFA6" />
          <ChartCard padding={padding} title="Deaths" data={data!.map(e => ({xValue: e.deaths, yValue: e.date.getTime()}))} color="#F96E64" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
