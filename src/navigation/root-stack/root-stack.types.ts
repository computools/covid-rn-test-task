import * as Stack from '@react-navigation/native-stack';

import {Country} from '../../apis/covid/dto/country';
import {RootRoutes} from './root-routes.types';

export type RootStackParamList = {
  [RootRoutes.Home]: undefined;
  [RootRoutes.AllCountries]: undefined;
  [RootRoutes.CountryDetails]: {country: Country};
  [RootRoutes.UserReport]: undefined;
};

export interface RootStackProps<Screen extends RootRoutes> extends Stack.NativeStackScreenProps<RootStackParamList, Screen> {}
