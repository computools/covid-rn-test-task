import React from 'react';
import {View, Text} from 'react-native';
import {LinkButton} from '../../components/link-button';

import {Country} from '../../models/country';
import {CountryItem} from './CountryItem';

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
        <CountryItem key={`country-${country.id}`} showSeparator={index !== firstItemIndex} country={country} />
      ))}
    </View>
  </View>
);
