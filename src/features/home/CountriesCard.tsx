import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Country} from '../../models/country';
import {CountryItem} from './CountryItem';

import {styles} from './styles/countries-card';

interface Props {
  countries: Array<Country>;
}

const firstItemIndex = 0;

export const CountriesCard: React.FC<Props> = ({countries}) => (
  <View style={styles.wrapper}>
    <View style={styles.headerWrapper}>
      <Text style={styles.headerTitle}>Top Countries</Text>
      <TouchableOpacity>
        <Text style={styles.headerMoreText}>See More</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.countriesWrapper}>
      {countries.map((country, index) => (
        <CountryItem key={`country-${country.id}`} showSeparator={index !== firstItemIndex} country={country} />
      ))}
    </View>
  </View>
);
