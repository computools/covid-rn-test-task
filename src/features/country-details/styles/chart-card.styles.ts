import {StyleSheet} from 'react-native';

export const margin = 20;

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: margin,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(228, 228, 228, 0.6)',
    padding: 5,
  },
  titleWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '400',
    color: '#687089',
    marginEnd: 5,
  },
  titleValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  chartWrapper: {
    width: '100%',
    height: '100%',
  },
});
