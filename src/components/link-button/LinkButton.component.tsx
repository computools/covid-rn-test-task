import React from 'react';
import {StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {styles} from './link-button.styles';

interface Props extends TouchableOpacityProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
}

export const LinkButton: React.FC<Props> = ({text, textStyle, ...rest}) => (
  <TouchableOpacity {...rest}>
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableOpacity>
);
