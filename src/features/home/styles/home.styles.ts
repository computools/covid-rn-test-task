import {Dimensions, StyleSheet} from 'react-native';

const {width: wWidth} = Dimensions.get('window');

const paddingRatio = 0.04;

export const progressColor = '#5ED7C7';
export const padding = wWidth * paddingRatio;

export const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
  emptyScreenWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  screenWrapper: {
    paddingVertical: padding,
    paddingHorizontal: padding,
    alignItems: 'center',
  },
});
