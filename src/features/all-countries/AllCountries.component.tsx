import React from 'react';
import {FlatList, ListRenderItemInfo, Platform, RefreshControl, View} from 'react-native';
import {useQuery} from 'react-query';
import debounce from 'lodash.debounce';

import {OutlinedTextInput} from '../../components/outilned-text-input/OutilnedTextInput.component';
import {RootRoutes} from '../../navigation/root-stack/root-routes.types';
import {RootStackProps} from '../../navigation/root-stack/root-stack.types';
import {CountryRow} from '../../components/country-row/CountryRow';
import {CovidApi} from '../../apis/covid/covid-api';
import {Country} from '../../models/country';

import {styles} from './styles/all-countries.styles';

const firstQueryIndex = 0;
const waitTime = 500;

export const AllCountries: React.FC<RootStackProps<RootRoutes.AllCountries>> = ({navigation}) => {
  const [query, setQuery] = React.useState('');
  const delayedQuery = debounce((q: string) => setQuery(q), waitTime);
  const {isLoading, data, refetch} = useQuery([query], ({queryKey}) => CovidApi.getAllCountriesSummary(queryKey[firstQueryIndex]));

  const navigateToCountryDetails = (country: Country) => navigation.navigate(RootRoutes.CountryDetails, {country});

  const renderItem = ({item}: ListRenderItemInfo<Country>) => <CountryRow onPress={navigateToCountryDetails} country={item} />;
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      style={styles.background}
      data={data}
      contentContainerStyle={styles.contentWrapper}
      ListHeaderComponent={
        <OutlinedTextInput
          containerStyle={Platform.select({android: styles.searchInputContent})}
          activeColor="#5ED7C7"
          label="Search"
          value={query}
          onChangeText={delayedQuery}
        />
      }
      renderItem={renderItem}
      keyExtractor={item => `Country-${item.id}`}
      ItemSeparatorComponent={renderSeparator}
      refreshControl={<RefreshControl tintColor="#5ED7C7" refreshing={isLoading} onRefresh={refetch} />}
    />
  );
};
