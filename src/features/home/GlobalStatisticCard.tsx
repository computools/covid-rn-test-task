import React from 'react';
import {View, Dimensions, ViewStyle, StyleProp} from 'react-native';

import {styles} from './styles/global-statistic-card';

export interface DataItem {
  id: string;
  value: number;
  title: string;
  color: string;
}

interface Props {
  wrapperStyle?: StyleProp<ViewStyle>;
  paddingHorizontal: number;
  data: Array<DataItem>;
}

const {width: wWidth} = Dimensions.get('window');
const aspectRatio = 0.65;

const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;

export const GlobalStatisticCard: React.FC<Props> = ({paddingHorizontal, wrapperStyle, data}) => {
  const cardWidth = wWidth - paddingHorizontal * 2;
  const cardHeight = aspectRatio * cardWidth;
  const canvasWidth = cardWidth;
  const canvasHeight = cardHeight - 50;
  const emptyGaps = data.length + 1;
  const step = canvasWidth / emptyGaps;
  const columnWidth = 20;
  const columnCapHeight = 25;
  const maxY = Math.max(...data.map(d => d.value));

  return (
    <View style={[{width: cardWidth, height: cardHeight}, styles.wrapper, wrapperStyle]}>
      {data.map((data, i) => {
        const totalHeight = lerp(0, canvasHeight, data.value / maxY);

        return (
          <View
            key={`Column-${data.id}`}
            style={{
              position: 'absolute',
              left: (i + 1) * step - 5,
              bottom: 0,
              width: columnWidth,
              height: totalHeight + columnCapHeight,
              // backgroundColor: data.color,
            }}>
            <View
              style={{
                backgroundColor: data.color,
                position: 'absolute',
                top: 0,
                bottom: 0,
                opacity: 0.5,
                width: columnWidth,
                borderTopLeftRadius: columnWidth / 2,
                borderTopRightRadius: columnWidth / 2,
              }}
            />
            <View
              style={{
                backgroundColor: data.color,
                position: 'absolute',
                top: 0,
                height: columnCapHeight,
                width: columnWidth,
                borderRadius: columnWidth / 2,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};
