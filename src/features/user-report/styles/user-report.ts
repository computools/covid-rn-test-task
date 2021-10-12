import {Dimensions, StyleSheet} from 'react-native';

const paddingRatio = 0.04;
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: width * paddingRatio,
  },
  emptySpace: {flex: 1},
  addReportButton: {alignSelf: 'center'},
});
