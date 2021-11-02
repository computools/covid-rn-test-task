import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export const UserReportButton: React.FC<TouchableOpacityProps> = props => (
  <TouchableOpacity {...props}>
    <Svg width={24} height={20} fill="none">
      <Path
        d="M16 19.143v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10l2 2 4-4m-10.5-2a4 4 0 11-8 0 4 4 0 018 0z"
        stroke="#999"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);
