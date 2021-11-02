import React from 'react';
import {View} from 'react-native';
import * as shape from 'd3-shape';
import {scaleLinear} from 'd3-scale';
import Svg, {Color, Defs, LinearGradient, Path, Stop} from 'react-native-svg';

import {styles} from './curve-chart.styles';

export interface DataPoint {
  xValue: number;
  yValue: number;
}

const zero = 0;

const buildGraph = (datapoints: Array<DataPoint>, d: {width: number; height: number}) => {
  const formattedValues = datapoints.map(p => [p.xValue, p.yValue] as [number, number]);
  const xValues = datapoints.map(p => p.xValue);
  const yValues = datapoints.map(p => p.yValue);
  const scaleX = scaleLinear()
    .domain([Math.min(...yValues), Math.max(...yValues)])
    .range([zero, d.width]);
  const minConfirmed = Math.min(...xValues);
  const maxConfirmed = Math.max(...xValues);
  const scaleY = scaleLinear().domain([minConfirmed, maxConfirmed]).range([d.height, zero]);
  return shape
    .line()
    .x(([, x]) => scaleX(x))
    .y(([y]) => scaleY(y))
    .curve(shape.curveBasis)(formattedValues) as string;
};

interface Props {
  data: Array<DataPoint>;
  color: Color;
}

export const CurveChart: React.FC<Props> = ({data, color}) => {
  const [chartD, setChartD] = React.useState({width: 0, height: 0});
  const path = buildGraph(data, {...chartD});

  return (
    <View onLayout={({nativeEvent: {layout}}) => setChartD({width: layout.width, height: layout.height})} style={styles.wrapper}>
      <Svg width={chartD.width} height={chartD.height}>
        <Path d={path} strokeLinecap="round" stroke={color} strokeWidth={2} />
        <Path d={path + `L ${chartD.width} ${chartD.width} Z`} fill="url(#linear)" strokeWidth={3} />
        <Defs>
          <LinearGradient id="linear" x1={0} y1={0} x2={chartD.width} y2={chartD.height} gradientUnits="userSpaceOnUse">
            <Stop stopColor={color} stopOpacity={0.6} />
            <Stop offset={1} stopColor={color} stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};
