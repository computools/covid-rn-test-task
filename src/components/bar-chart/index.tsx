import React from 'react';
import {View, Dimensions, ViewStyle, StyleProp} from 'react-native';

import {ChartColumn} from './column';
import {DataItem} from './data-item';
import {XTitle} from './x-title';

import {styles} from './styles/styles';

interface Props {
  wrapperStyle?: StyleProp<ViewStyle>;
  paddingHorizontal: number;
  data: Array<DataItem>;
}

const {width: wWidth} = Dimensions.get('window');
const aspectRatio = 0.65;
const twice = 2;
const gapsVal = 1;

export const BarChart: React.FC<Props> = ({paddingHorizontal, wrapperStyle, data}) => {
  const heightPadding = 100;
  const cardWidth = wWidth - paddingHorizontal * twice;
  const cardHeight = aspectRatio * cardWidth;
  const canvasWidth = cardWidth;
  const canvasHeight = cardHeight - heightPadding;
  const emptyGaps = data.length + gapsVal;
  const step = canvasWidth / emptyGaps;
  const columnWidth = 20;
  const columnCapHeight = 30;
  const maxY = Math.max(...data.map(d => d.value));

  return (
    <View>
      <View style={[{width: cardWidth, height: cardHeight}, wrapperStyle]}>
        {data.map((item, i) => (
          <ChartColumn
            key={`column-${item.id}`}
            index={i}
            columnWidth={columnWidth}
            columnCapHeight={columnCapHeight}
            step={step}
            item={item}
            maxY={maxY}
            canvasHeight={canvasHeight}
          />
        ))}
      </View>
      <View style={styles.titlesWrapper}>
        {data.map((item, i) => (
          <XTitle key={`x-title-${item.id}`} index={i} step={step} item={item} />
        ))}
      </View>
    </View>
  );
};
