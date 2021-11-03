import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';

import {numFormatter} from '../../utils/num-formatter';
import {DataItem} from './data-item.types';

import {styles, tooltipArrow} from './styles/chart-column.styles';

interface Props {
  index: number;
  columnWidth: number;
  columnCapHeight: number;
  step: number;
  item: DataItem;
  maxY: number;
  canvasHeight: number;
}

const twice = 2;
const defaultTooltipWidth = 0;
const indexShift = 1;

export const ChartColumn: React.FC<Props> = ({index, item, maxY, canvasHeight, columnWidth, columnCapHeight, step}) => {
  const [tooltipWidth, setToolTipWidth] = React.useState(defaultTooltipWidth);

  const totalHeight = canvasHeight * (item.value / maxY);
  const left = (index + indexShift) * step;

  const halfArrow = tooltipArrow / twice;
  const halfColumnWidth = columnWidth / twice;

  return (
    <>
      <View
        onLayout={e => setToolTipWidth(e.nativeEvent.layout.width)}
        style={[
          {
            minWidth: columnWidth * twice,
            left: left - tooltipWidth / twice,
            bottom: totalHeight + columnCapHeight + tooltipArrow,
            backgroundColor: item.color,
          },
          styles.tooltipWrapper,
        ]}>
        <Text style={styles.tooltipText}>{numFormatter(item.value)}</Text>
      </View>
      <Svg style={[{left: left - halfArrow, bottom: totalHeight + columnCapHeight}, styles.tooltipArrow]} height={tooltipArrow} width={tooltipArrow}>
        <Polygon points={`0,0 ${halfArrow},${halfArrow} ${tooltipArrow},0`} fill={item.color} />
      </Svg>
      <View
        style={[
          {
            left: left - halfColumnWidth,
            width: columnWidth,
            height: totalHeight + columnCapHeight,
          },
          styles.columnWrapper,
        ]}>
        <View
          style={[
            {
              backgroundColor: item.color,
              width: columnWidth,
              borderTopLeftRadius: halfColumnWidth,
              borderTopRightRadius: halfColumnWidth,
            },
            styles.columnBackground,
          ]}
        />
        <View
          style={[
            {
              backgroundColor: item.color,
              height: columnCapHeight,
              width: columnWidth,
              borderRadius: halfColumnWidth,
            },
            styles.cap,
          ]}
        />
      </View>
    </>
  );
};
