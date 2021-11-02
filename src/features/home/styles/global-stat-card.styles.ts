import {Dimensions, StyleSheet} from 'react-native';

const {width: wWidth} = Dimensions.get('window');
const paddingRatio = 0.04;

export const padding = wWidth * paddingRatio;

export const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'rgba(228, 228, 228, 0.6)',
    marginVertical: '4%',
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
    padding: 18,
  },
  activeButtonText: {
    color: '#00BFA6',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15,
    borderTopWidth: 2,
    borderColor: 'rgba(228, 228, 228, 0.6)',
  },
});
