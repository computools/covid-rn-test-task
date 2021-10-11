import React from 'react';
import Svg, {Color, Path} from 'react-native-svg';

interface Props {
  color: Color;
  isRise?: boolean;
}
export const Chevron: React.FC<Props> = ({color, isRise}) => (
  <Svg style={!isRise && {transform: [{rotateX: '180deg'}]}} width={10} height={7} fill="none">
    <Path d="M3.861 1.329a1.5 1.5 0 012.278 0l2.739 3.195C9.712 5.497 9.02 7 7.738 7H2.262C.98 7 .288 5.497 1.122 4.524l2.74-3.195z" fill={color} />
  </Svg>
);
