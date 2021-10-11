import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    padding: '6%',
    borderWidth: 2,
    borderColor: 'rgba(228, 228, 228, 0.6)',
    borderRadius: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 64,
    height: 45,
    borderRadius: 10,
  },
  countryName: {
    marginStart: 25,
    fontSize: 22,
    fontWeight: '400',
  },
  confirmedRow: {
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderColor: 'rgba(228, 228, 228, 0.6)',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
  },
  confirmedColor: {color: '#00C48C'},
  dangerColor: {color: '#FF647C'},
  subtitle: {
    marginTop: 5,
    color: '#999999',
    fontSize: 17,
    fontWeight: '400',
  },
  deathRow: {paddingTop: 20},
});
