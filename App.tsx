import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';

import {RootNavigation} from './src/navigation/RootNavigation';

export const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigation />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  wrapper: {flex: 1},
});
