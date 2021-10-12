import {Dimensions, StyleSheet} from 'react-native';

const {width: wWidth} = Dimensions.get('window');

const paddingRatio = 0.04;

export const padding = wWidth * paddingRatio;

export const styles = StyleSheet.create({
  screeenWrapper: {
    flex: 1,
  },
  screenContent: {padding},
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
