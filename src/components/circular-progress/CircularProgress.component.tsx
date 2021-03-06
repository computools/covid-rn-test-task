import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Svg, Path, G, Linecap, Color} from 'react-native-svg';

import {polarToCartesian} from '../../utils/polar-to-cartesian';
import {buildCirclePath} from '../../utils/build-circle-path';

import {styles} from './circular-progress.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  size: number;
  fill: number;
  width: number;
  backgroundWidth?: number;
  tintColor?: Color;
  dangerTintColor?: Color;
  dangerValue?: number;
  tintTransparency?: boolean;
  backgroundColor?: Color;
  rotation?: number;
  lineCap?: Linecap;
  fillLineCap?: Linecap;
  arcSweepAngle?: number;
  childrenContainerStyle?: StyleProp<ViewStyle>;
  padding?: number;
  children?: (fill: number) => JSX.Element;
  renderCap?: (coordinate: {center: {x: number; y: number}}) => JSX.Element;
}

const fullTurn = 360;
const emptyValue = 0;
const halfRatio = 2;
const fullProgress = 100;

export const CircularProgress: React.FC<Props> = ({
  size,
  width,
  backgroundWidth,
  tintColor = 'black',
  dangerTintColor = 'black',
  dangerValue = emptyValue,
  tintTransparency = true,
  backgroundColor,
  style,
  rotation = fullTurn,
  lineCap = 'butt',
  fillLineCap = lineCap,
  arcSweepAngle = fullTurn,
  fill,
  children,
  childrenContainerStyle = {} as Object,
  padding = emptyValue,
  renderCap,
}) => {
  const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;
  const sizeWithPadding = size / halfRatio + padding / halfRatio;
  const radius = size / halfRatio - maxWidthCircle / halfRatio - padding / halfRatio;

  const currentFillAngle = (arcSweepAngle * Math.min(fullProgress, Math.max(emptyValue, fill))) / fullProgress;
  const backgroundPath = buildCirclePath(sizeWithPadding, sizeWithPadding, radius, tintTransparency ? emptyValue : currentFillAngle, arcSweepAngle);
  const circlePath = buildCirclePath(sizeWithPadding, sizeWithPadding, radius, emptyValue, currentFillAngle);
  const coordinate = polarToCartesian(sizeWithPadding, sizeWithPadding, radius, currentFillAngle);
  const cap = renderCap ? renderCap({center: coordinate}) : null;

  const offset = size - maxWidthCircle * halfRatio;

  const localChildrenContainerStyle: StyleProp<ViewStyle> = {
    left: maxWidthCircle + padding / halfRatio,
    top: maxWidthCircle + padding / halfRatio,
    width: offset,
    height: offset,
    borderRadius: offset / halfRatio,
  };

  return (
    <View style={style}>
      <Svg width={size + padding} height={size + padding}>
        <G rotation={rotation} originX={(size + padding) / halfRatio} originY={(size + padding) / halfRatio}>
          {backgroundColor && (
            <Path d={backgroundPath} stroke={backgroundColor} strokeWidth={backgroundWidth || width} strokeLinecap={lineCap} fill="transparent" />
          )}
          {fill > emptyValue && (
            <Path
              d={circlePath}
              stroke={fill > dangerValue ? dangerTintColor : tintColor}
              strokeWidth={width}
              strokeLinecap={fillLineCap}
              fill="transparent"
            />
          )}
          {cap}
        </G>
      </Svg>
      {children && <View style={[localChildrenContainerStyle, styles.childrenWrapper, childrenContainerStyle]}>{children(fill)}</View>}
    </View>
  );
};
