import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Color} from 'react-native-svg';
import {Chevron} from '../../components/chevron';

import {CurveChart, DataPoint} from '../../components/curve-chart';
import {toLocaleStr} from '../../utils/to-locale-str';

import {styles} from './styles/chart-card';

interface Props {
  title: string;
  data: Array<DataPoint>;
  color: Color;
  padding: number;
}

const {width} = Dimensions.get('window');
const half = 2;
const widthRatio = 1.5;
const lastTwoItemsIndex = -2;
const defaultValue = 0;

export const ChartCard: React.FC<Props> = ({data, title, color, padding}) => {
  const [yesterdayValue, todayValue] = data.slice(lastTwoItemsIndex) || [defaultValue, defaultValue];
  const size = width / half - padding * widthRatio;

  return (
    <View style={[styles.wrapper, {width: size, height: size}]}>
      <View style={styles.titleWrapper}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Chevron isRise={yesterdayValue.xValue < todayValue.xValue} color={color} />
        </View>
        <Text style={styles.titleValue}>{toLocaleStr(todayValue.xValue)}</Text>
      </View>
      <View style={styles.chartWrapper}>
        <CurveChart color={color} data={data} />
      </View>
    </View>
  );
};
