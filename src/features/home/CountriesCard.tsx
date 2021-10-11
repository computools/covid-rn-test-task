import React from 'react';
import {View, Text} from 'react-native';
import {LinkButton} from '../../components/link-button';

import {CountryRow} from '../../components/country-row';
import {Country} from '../../models/country';

import {styles} from './styles/countries-card';

interface Props {
  onSeeMorePress?: () => void;
  countries: Array<Country>;
}

const firstItemIndex = 0;

export const CountriesCard: React.FC<Props> = ({countries, onSeeMorePress}) => (
  <View style={styles.wrapper}>
    <View style={styles.headerWrapper}>
      <Text style={styles.headerTitle}>Top Countries</Text>
      <LinkButton onPress={onSeeMorePress} text="See More" />
    </View>
    <View style={styles.countriesWrapper}>
      {countries.map((country, index) => (
        <CountryRow key={`country-${country.id}`} showSeparator={index !== firstItemIndex} country={country} />
      ))}
    </View>
  </View>
);
