import {StyleSheet} from 'react-native';

export const tooltipArrow = 10;

export const styles = StyleSheet.create({
  tooltipWrapper: {
    position: 'absolute',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tooltipText: {
    textAlign: 'center',
    color: '#FFF',
  },
  tooltipArrow: {position: 'absolute'},
  columnWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  columnBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
  cap: {
    position: 'absolute',
    top: 0,
  },
});
