import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {RootNavigation} from './src/navigation/RootNavigation';

export const App: React.FC = () => (
  <GestureHandlerRootView style={styles.wrapper}>
    <RootNavigation />
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});
