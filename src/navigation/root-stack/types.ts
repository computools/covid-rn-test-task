import * as Stack from '@react-navigation/native-stack';

import {Country} from '../../models/country';
import {RootRoutes} from './root-routes';

export type RootStackParamList = {
  [RootRoutes.Home]: undefined;
  [RootRoutes.AllCountries]: undefined;
  [RootRoutes.CountryDetails]: {country: Country};
};

export interface RootStackProps<Screen extends RootRoutes> extends Stack.NativeStackScreenProps<RootStackParamList, Screen> {}
