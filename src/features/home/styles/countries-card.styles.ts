import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgba(228, 228, 228, 0.6)',
    borderRadius: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4%',
    borderBottomWidth: 2,
    borderColor: 'rgba(228, 228, 228, 0.6)',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  headerMoreText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#FF647C',
  },
  countriesWrapper: {
    padding: '4%',
  },
});
