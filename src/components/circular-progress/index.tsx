import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Svg, Path, G, Linecap, Color} from 'react-native-svg';

interface Props {
  style?: StyleProp<ViewStyle>;
  size: number;
  fill: number;
  width: number;
  backgroundWidth?: number;
  tintColor?: Color;
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

export class CircularProgress extends React.PureComponent<Props> {
  public polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  public circlePath(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    const end = this.polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  }

  public clampFill = (fill: number) => Math.min(100, Math.max(0, fill));

  public render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor = 'black',
      tintTransparency = true,
      backgroundColor,
      style,
      rotation = 360,
      lineCap = 'butt',
      fillLineCap = lineCap,
      arcSweepAngle = 360,
      fill,
      children,
      childrenContainerStyle = {} as Object,
      padding = 0,
      renderCap,
    } = this.props;

    const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;
    const sizeWithPadding = size / 2 + padding / 2;
    const radius = size / 2 - maxWidthCircle / 2 - padding / 2;

    const currentFillAngle = (arcSweepAngle * this.clampFill(fill)) / 100;
    const backgroundPath = this.circlePath(sizeWithPadding, sizeWithPadding, radius, tintTransparency ? 0 : currentFillAngle, arcSweepAngle);
    const circlePath = this.circlePath(sizeWithPadding, sizeWithPadding, radius, 0, currentFillAngle);
    const coordinate = this.polarToCartesian(sizeWithPadding, sizeWithPadding, radius, currentFillAngle);
    const cap = renderCap ? renderCap({center: coordinate}) : null;

    const offset = size - maxWidthCircle * 2;

    const localChildrenContainerStyle: StyleProp<ViewStyle> = {
      ...{
        position: 'absolute',
        left: maxWidthCircle + padding / 2,
        top: maxWidthCircle + padding / 2,
        width: offset,
        height: offset,
        borderRadius: offset / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      ...childrenContainerStyle,
    };

    return (
      <View style={style}>
        <Svg width={size + padding} height={size + padding}>
          <G rotation={rotation} originX={(size + padding) / 2} originY={(size + padding) / 2}>
            {backgroundColor && (
              <Path d={backgroundPath} stroke={backgroundColor} strokeWidth={backgroundWidth || width} strokeLinecap={lineCap} fill="transparent" />
            )}
            {fill > 0 && <Path d={circlePath} stroke={tintColor} strokeWidth={width} strokeLinecap={fillLineCap} fill="transparent" />}
            {cap}
          </G>
        </Svg>
        {children && <View style={localChildrenContainerStyle}>{children(fill)}</View>}
      </View>
    );
  }
}
