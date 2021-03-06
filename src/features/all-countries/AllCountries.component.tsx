import React from 'react';
import {FlatList, ListRenderItemInfo, Platform, RefreshControl, View} from 'react-native';
import {useQuery} from 'react-query';

import {OutlinedTextInput} from '../../components/outilned-text-input/OutilnedTextInput.component';
import {RootRoutes} from '../../navigation/root-stack/root-routes.types';
import {RootStackProps} from '../../navigation/root-stack/root-stack.types';
import {CountryRow} from '../../components/country-row/CountryRow';
import {Country} from '../../apis/covid/dto/country';
import {CovidApi} from '../../apis/covid/covid-api';

import {styles} from './styles/all-countries.styles';

export const AllCountries: React.FC<RootStackProps<RootRoutes.AllCountries>> = ({navigation}) => {
  const [query, setQuery] = React.useState('');
  const {isLoading, data, refetch} = useQuery('countriesSummary', CovidApi.getSummary);

  const navigateToCountryDetails = (country: Country) => navigation.navigate(RootRoutes.CountryDetails, {country});

  const renderItem = ({item}: ListRenderItemInfo<Country>) => <CountryRow onPress={navigateToCountryDetails} country={item} />;
  const renderSeparator = () => <View style={styles.separator} />;

  const filteredCountries = data?.Countries.filter(c => c.Country.toLowerCase().includes(query.toLowerCase()));

  return (
    <FlatList
      style={styles.background}
      data={filteredCountries}
      contentContainerStyle={styles.contentWrapper}
      ListHeaderComponent={
        <OutlinedTextInput
          containerStyle={Platform.select({android: styles.searchInputContent})}
          activeColor="#5ED7C7"
          label="Search"
          value={query}
          onChangeText={setQuery}
        />
      }
      renderItem={renderItem}
      keyExtractor={item => `Country-${item.ID}`}
      ItemSeparatorComponent={renderSeparator}
      refreshControl={<RefreshControl tintColor="#5ED7C7" refreshing={isLoading} onRefresh={refetch} />}
    />
  );
};
