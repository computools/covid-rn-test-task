import {StyleSheet} from 'react-native';

export const defaultInputHeight = 40;
export const defaultLabelHeight = 11;

export const defaultLabelSelectedSize = 14;
export const defaultLabelUnselectedSize = 12;

export const defaultAnimationDuration = 200;

export const defaultActiveColor = '#6200ee';
export const defaultInactiveColor = '#8E8E8E';
export const defaultBackgroundColor = '#FFFFFF';

export const defaultPadding = 12;
export const labelPadding = 4;

const borderRadius = 10;
const margin = 10;
const borderWidth = 1.5;

export const styles = StyleSheet.create({
  container: {
    margin,
    borderWidth,
    borderRadius: borderRadius,
    padding: defaultPadding,
  },
  label: {
    position: 'absolute',
    paddingHorizontal: labelPadding,
  },
});
