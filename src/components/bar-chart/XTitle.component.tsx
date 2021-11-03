import React from 'react';
import {Text} from 'react-native';

import {DataItem} from './data-item.types';

import {styles} from './styles/x-title.styles';

interface Props {
  item: DataItem;
  step: number;
  index: number;
}

const defaultWidth = 0;
const half = 2;
const indexOffset = 1;

export const XTitle: React.FC<Props> = ({item, step, index}) => {
  const [titleWidth, setTitleWidth] = React.useState(defaultWidth);
  return (
    <Text onLayout={e => setTitleWidth(e.nativeEvent.layout.width)} style={[styles.text, {left: step * (index + indexOffset) - titleWidth / half}]}>
      {item.title}
    </Text>
  );
};
