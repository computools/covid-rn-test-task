import {Dimensions, StyleSheet} from 'react-native';

const {width: wWidth} = Dimensions.get('window');

const paddingRatio = 0.04;

export const padding = wWidth * paddingRatio;

export const styles = StyleSheet.create({
  screenWrapper: {
    paddingVertical: padding,
    paddingHorizontal: padding,
    alignItems: 'center',
  },
});
