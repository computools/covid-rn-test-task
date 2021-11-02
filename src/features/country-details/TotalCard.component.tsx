import React from 'react';
import {View, Image, Text} from 'react-native';

import {toLocaleStr} from '../../utils/to-locale-str';
import {Country} from '../../models/country';

import {styles} from './styles/total-card.styles';

interface Props {
  country: Country;
}

export const TotalCard: React.FC<Props> = ({country}) => (
  <View style={styles.wrapper}>
    <View style={styles.titleWrapper}>
      <Image style={styles.flag} source={{uri: `https://www.worldometers.info/img/flags/${country.countryCode.toLowerCase()}-flag.gif`}} />
      <Text style={styles.countryName}>{country.name}</Text>
    </View>
    <View style={styles.confirmedRow}>
      <Text style={[styles.titleText, styles.confirmedColor]}>{toLocaleStr(country.totalConfirmed)}</Text>
      <Text style={styles.subtitle}>{toLocaleStr(country.newConfirmed)} Infected cases reported</Text>
    </View>
    <View style={styles.deathRow}>
      <Text style={[styles.titleText, styles.dangerColor]}>{toLocaleStr(country.totalDeaths)}</Text>
      <Text style={styles.subtitle}>{toLocaleStr(country.newDeaths)} Death cases reported</Text>
    </View>
  </View>
);
