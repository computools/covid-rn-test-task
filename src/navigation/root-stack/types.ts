import * as Stack from '@react-navigation/native-stack';

import {RootRoutes} from './root-routes';

export type RootStackParamList = {
  [RootRoutes.Home]: undefined;
  [RootRoutes.AllCountries]: undefined;
};

export interface RootStackProps extends Stack.NativeStackScreenProps<RootStackParamList, RootRoutes.Home> {}
