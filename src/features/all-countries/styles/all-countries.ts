import {Dimensions, StyleSheet} from 'react-native';

const {width: wWidth} = Dimensions.get('window');

const paddingRatio = 0.04;

export const padding = wWidth * paddingRatio;

export const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
  searchInputContent: {
    padding: 5,
    paddingVertical: 0,
  },
  contentWrapper: {
    paddingVertical: padding,
    paddingHorizontal: padding,
  },
  separator: {
    height: 2,
    backgroundColor: 'rgba(228, 228, 228, 0.6)',
    width: '100%',
  },
});
