import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import FastImage from 'react-native-fast-image';

import {toLocaleStr} from '../../utils/to-locale-str';
import {Country} from '../../apis/covid/dto/country';
import {CovidApi} from '../../apis/covid/covid-api';

import {styles} from './styles/total-card.styles';
import {Case} from '../../apis/covid/dto/case';

interface Props {
  country: Country;
}

export const TotalCard: React.FC<Props> = ({country}) => {
  const {isLoading, data} = useQuery('cachedReports', CovidApi.getReportedCasesStat);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const repored = data!.byCountry[country.Slug] || [];

  const cachedConfirmed = repored.filter(r => r === Case.Active).length;
  const cachedDeaths = repored.filter(r => r === Case.Death).length;

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <FastImage style={styles.flag} source={{uri: `https://www.worldometers.info/img/flags/${country.CountryCode.toLowerCase()}-flag.gif`}} />
        <Text style={styles.countryName}>{country.Country}</Text>
      </View>
      <View style={styles.confirmedRow}>
        <Text style={[styles.titleText, styles.confirmedColor]}>{toLocaleStr(country.TotalConfirmed)}</Text>
        <Text style={styles.subtitle}>{toLocaleStr(country.NewConfirmed + cachedConfirmed)} Infected cases reported</Text>
      </View>
      <View style={styles.deathRow}>
        <Text style={[styles.titleText, styles.dangerColor]}>{toLocaleStr(country.TotalDeaths)}</Text>
        <Text style={styles.subtitle}>{toLocaleStr(country.NewDeaths + cachedDeaths)} Death cases reported</Text>
      </View>
    </View>
  );
};
