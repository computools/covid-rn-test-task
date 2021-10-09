import {StyleSheet} from 'react-native';

export const tintProgressColor = '#5ED7C7';
export const progressBackgroundColor = 'rgba(228, 228, 228, 1)';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  separator: {
    borderTopWidth: 2,
    borderColor: 'rgba(228, 228, 228, 0.6)',
  },
  flag: {
    width: 64,
    height: 45,
    borderRadius: 10,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 5,
  },
  statText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(38, 50, 56, 0.8)',
  },
  statsBar: {
    width: 64,
    height: 64,
  },
  progressText: {
    textAlign: 'center',
    color: 'rgba(21, 21, 34, 1)',
    fontSize: 15,
    fontWeight: '500',
  },
});
