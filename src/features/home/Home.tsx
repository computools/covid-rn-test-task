import React from 'react';
import {View, Text} from 'react-native';

import {RootStackProps} from '../../navigation/root-stack/types';

import {styles} from './styles/home';

export const Home: React.FC<RootStackProps> = () => (
  <View style={styles.screenWrapper}>
    <Text>Home Screen</Text>
  </View>
);
