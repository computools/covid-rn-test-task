import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import {RootStackProps} from '../../navigation/root-stack/types';
import {CountriesCard} from './CountriesCard';
import {Country} from '../../models/country';

import {styles} from './styles/home';

const countries: Array<Country> = [
  new Country(1, 'USA', 'https://www.countryflags.io/us/flat/64.png', 7601182, 4818768, 3654121),
  new Country(2, 'Spain', 'https://www.countryflags.io/es/flat/64.png', 810807, 579143, 326121),
  new Country(3, 'France', 'https://www.countryflags.io/fr/flat/64.png', 606625, 97778, 21262),
  new Country(4, 'Switzerland', 'https://www.countryflags.io/ch/flat/64.png', 606625, 97778, 21262),
  new Country(5, 'United Kingdom', 'https://www.countryflags.io/gb/flat/64.png', 606625, 97778, 21262),
];

export const Home: React.FC<RootStackProps> = () => (
  <ScrollView contentContainerStyle={styles.screenWrapper}>
    <CountriesCard countries={countries} />
  </ScrollView>
);
