import React from 'react';
import {View, Text, Image} from 'react-native';

import {CircularProgress} from '../../components/circular-progress';
import {toLocaleStr} from '../../utils/to-locale-str';
import {Country} from '../../models/country';

import {dangerTintProgressColor, progressBackgroundColor, styles, tintProgressColor} from './styles/country-item';

interface Props {
  showSeparator?: boolean;
  country: Country;
}

const percentRatio = 100;

export const CountryItem: React.FC<Props> = ({country, showSeparator}) => (
  <View style={[styles.wrapper, showSeparator && styles.separator]}>
    <Image style={styles.flag} source={{uri: `https://www.countryflags.io/${country.countryCode.toLowerCase()}/flat/64.png`}} />
    <View style={styles.statWrapper}>
      <Text style={styles.countryName}>{country.name}</Text>
      <Text style={styles.statText}>Active cases - {toLocaleStr(country.totalConfirmed)}</Text>
      <Text style={styles.statText}>Recovered - {toLocaleStr(country.totalRecovered)}</Text>
      <Text style={styles.statText}>Deaths - {toLocaleStr(country.totalDeaths)}</Text>
    </View>
    <CircularProgress
      size={64}
      width={3}
      fill={Math.round((country.totalDeaths / country.totalConfirmed) * percentRatio)}
      tintColor={tintProgressColor}
      dangerTintColor={dangerTintProgressColor}
      dangerValue={50}
      lineCap="round"
      backgroundColor={progressBackgroundColor}>
      {(fill: number) => <Text style={styles.progressText}>{fill}%</Text>}
    </CircularProgress>
  </View>
);
