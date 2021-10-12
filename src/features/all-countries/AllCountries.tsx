import React from 'react';
import {FlatList, Platform, RefreshControl, View} from 'react-native';
import {useQuery} from 'react-query';
import debounce from 'lodash.debounce';

import {OutlinedTextInput} from '../../components/outilned-text-input';
import {RootRoutes} from '../../navigation/root-stack/root-routes';
import {RootStackProps} from '../../navigation/root-stack/types';
import {CountryRow} from '../../components/country-row';
import {CovidApi} from '../../apis/covid/covid-api';

import {styles} from './styles/all-countries';

const firstQueryIndex = 0;
const waitTime = 500;

export const AllCountries: React.FC<RootStackProps<RootRoutes.AllCountries>> = ({navigation}) => {
  const [query, setQuery] = React.useState('');
  const delayedQuery = debounce((q: string) => setQuery(q), waitTime);
  const {isLoading, data, refetch} = useQuery([query], ({queryKey}) => CovidApi.getAllCountriesSummary(queryKey[firstQueryIndex]));

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
      renderItem={({item}) => <CountryRow onPress={() => navigation.navigate(RootRoutes.CountryDetails, {country: item})} country={item} />}
      keyExtractor={item => `Country-${item.id}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={<RefreshControl tintColor="#5ED7C7" refreshing={isLoading} onRefresh={refetch} />}
    />
  );
};
