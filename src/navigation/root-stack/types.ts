import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootRoutes} from './root-routes';

export type RootStackParamList = {
  [RootRoutes.Home]: undefined;
};

export interface RootStackProps
  extends NativeStackScreenProps<RootStackParamList, RootRoutes.Home> {}
