import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {RootNavigation} from './src/navigation/RootNavigation';

export const App: React.FC = () => (
  <GestureHandlerRootView style={styles.wrapper}>
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});
