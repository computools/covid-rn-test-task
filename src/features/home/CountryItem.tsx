import React from 'react';
import {View, Text, Image} from 'react-native';

import {CircularProgress} from '../../components/circular-progress';
import {toLocaleStr} from '../../utils/to-locale-str';
import {Country} from '../../models/country';

import {progressBackgroundColor, styles, tintProgressColor} from './styles/country-item';

interface Props {
  showSeparator?: boolean;
  country: Country;
}

export const CountryItem: React.FC<Props> = ({country, showSeparator}) => (
  <View style={[styles.wrapper, showSeparator && styles.separator]}>
    <Image style={styles.flag} source={{uri: country.flagURL}} />
    <View>
      <Text style={styles.countryName}>{country.name}</Text>
      <Text style={styles.statText}>Active cases - {toLocaleStr(country.activeCases)}</Text>
      <Text style={styles.statText}>Recovered - {toLocaleStr(country.recovered)}</Text>
      <Text style={styles.statText}>Deaths - {toLocaleStr(country.deaths)}</Text>
    </View>
    <View style={styles.statsBar}>
      <CircularProgress size={64} width={3} fill={75} tintColor={tintProgressColor} lineCap="round" backgroundColor={progressBackgroundColor}>
        {(fill: number) => <Text style={styles.progressText}>{fill}%</Text>}
      </CircularProgress>
    </View>
  </View>
);
