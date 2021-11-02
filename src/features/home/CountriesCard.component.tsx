import React from 'react';
import {View, Text} from 'react-native';
import {LinkButton} from '../../components/link-button/LinkButton.component';

import {CountryRow} from '../../components/country-row/CountryRow';
import {Country} from '../../apis/covid/dto/country';

import {styles} from './styles/countries-card.styles';

interface Props {
  onSeeMorePress?: () => void;
  countries: Array<Country>;
  goToCountryDetails: (country: Country) => void;
}

const firstItemIndex = 0;

export const CountriesCard: React.FC<Props> = ({countries, onSeeMorePress, goToCountryDetails}) => {
  const handleContrySelect = (country: Country) => goToCountryDetails(country);

  const renderCountryRow = (country: Country, index: number) => (
    <CountryRow onPress={handleContrySelect} key={`country-${country.ID}`} showSeparator={index !== firstItemIndex} country={country} />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Top Countries</Text>
        <LinkButton onPress={onSeeMorePress} text="See More" />
      </View>
      <View style={styles.countriesWrapper}>{countries.map(renderCountryRow)}</View>
    </View>
  );
};
