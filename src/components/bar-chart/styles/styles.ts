import {StyleSheet} from 'react-native';

import {tooltipArrow} from './column';

const twice = 2;

export const defaultCapHeight = 30;
export const defaultColumnWidth = 20;
export const defaultHeightPadding = defaultCapHeight + tooltipArrow * twice;

export const styles = StyleSheet.create({
  titlesWrapper: {
    height: 25,
  },
});
