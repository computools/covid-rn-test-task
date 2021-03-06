import React from 'react';
import {useQuery} from 'react-query';
import {ActivityIndicator, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {RootRoutes} from '../../navigation/root-stack/root-routes.types';
import {RootStackProps} from '../../navigation/root-stack/root-stack.types';
import {CovidApi} from '../../apis/covid/covid-api';
import {TotalCard} from './TotalCard.component';
import {ChartCard} from './ChartCard.component';

import {padding, styles} from './styles/country-details.styles';

export const CountryDetails: React.FC<RootStackProps<RootRoutes.CountryDetails>> = ({route}) => {
  const {isLoading, data} = useQuery('oneDay', () => CovidApi.getDayOneStatByCountry(route.params.country.Slug));

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const confirmed = data!.map(e => ({xValue: e.Confirmed, yValue: new Date(e.Date).getTime()}));
  const active = data!.map(e => ({xValue: e.Active, yValue: new Date(e.Date).getTime()}));
  const recovered = data!.map(e => ({xValue: e.Recovered, yValue: new Date(e.Date).getTime()}));
  const deaths = data!.map(e => ({xValue: e.Deaths, yValue: new Date(e.Date).getTime()}));

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <TotalCard country={route.params.country} />
      <View style={styles.chartsRow}>
        <ChartCard padding={padding} title="Confirmed" data={confirmed} color="#FF8A34" />
        <ChartCard padding={padding} title="Active" data={active} color="#3AC4FF" />
      </View>
      <View style={styles.chartsRow}>
        <ChartCard padding={padding} title="Recovered" data={recovered} color="#00BFA6" />
        <ChartCard padding={padding} title="Deaths" data={deaths} color="#F96E64" />
      </View>
    </ScrollView>
  );
};
