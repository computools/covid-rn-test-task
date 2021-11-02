import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import {ActivityIndicator, Alert, View} from 'react-native';
import {useQuery} from 'react-query';

import {RootRoutes} from '../../navigation/root-stack/root-routes.types';
import {RootStackProps} from '../../navigation/root-stack/root-stack.types';
import {LinkButton} from '../../components/link-button/LinkButton.component';
import {CovidApi} from '../../apis/covid/covid-api';
import {Case} from '../../apis/covid/dto/case';

import {styles} from './styles/user-report.styles';

export const UserReport: React.FC<RootStackProps<RootRoutes.UserReport>> = ({navigation}) => {
  const [country, setCountry] = React.useState(null);
  const [selectedCase, setCase] = React.useState(Case.Active);

  const {isLoading: isOptionsLoading, data} = useQuery('countryOptions', CovidApi.getCountriesOptions);

  const handleAddCase = React.useCallback(() => {
    if (country === null || !selectedCase) {
      Alert.alert('County not selected!');
    } else {
      CovidApi.addCase(country, selectedCase);
      navigation.goBack();
    }
  }, [navigation, country, selectedCase]);

  return (
    <SafeAreaView style={styles.screenWrapper}>
      {isOptionsLoading ? (
        <ActivityIndicator color="#00BFA6" />
      ) : (
        <Picker selectedValue={country} onValueChange={value => setCountry(value)}>
          {data?.map(c => (
            <Picker.Item key={`Country-${c.ISO2}`} label={c.Country} value={c.Slug} />
          ))}
        </Picker>
      )}
      <Picker selectedValue={selectedCase} onValueChange={value => setCase(value)}>
        {Object.values(Case).map(c => (
          <Picker.Item key={`Case-${c}`} label={c} value={c} />
        ))}
      </Picker>
      <View style={styles.emptySpace} />
      <LinkButton style={styles.addReportButton} onPress={handleAddCase} text="Add Case" />
    </SafeAreaView>
  );
};
