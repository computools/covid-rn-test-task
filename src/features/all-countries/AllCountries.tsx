import React from 'react';
import {ScrollView, Text} from 'react-native';

import {styles} from './styles/all-countries';

export const AllCountries = () => (
  <ScrollView contentContainerStyle={styles.screenWrapper}>
    <Text>All countries content</Text>
  </ScrollView>
);
