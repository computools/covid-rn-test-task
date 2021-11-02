import React from 'react';
import {
  Animated,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import {
  styles,
  defaultPadding,
  defaultActiveColor,
  defaultInactiveColor,
  defaultInputHeight,
  defaultLabelHeight,
  defaultLabelSelectedSize,
  defaultAnimationDuration,
  defaultLabelUnselectedSize,
  labelPadding,
  defaultBackgroundColor,
} from './outilned-text-input.styles';
import {useTimingAnimation} from '../../utils/use-timing-animation';

enum LabelStates {
  Unselected,
  Selected,
}

enum InputStates {
  Unfocused,
  Focused,
}

export interface Props extends TextInputProps {
  style?: StyleProp<TextStyle>;
  label?: string;
  labelFontSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  animationDuration?: number;
  activeColor?: string;
  inactiveColor?: string;
}

const twice = 2;
const four = 4;

export const OutlinedTextInput = React.forwardRef<TextInput, Props>(
  (
    {
      value,
      label,
      labelStyle,
      labelFontSize = defaultLabelUnselectedSize,
      containerStyle,
      animationDuration = defaultAnimationDuration,
      activeColor = defaultActiveColor,
      inactiveColor = defaultInactiveColor,
      ...props
    },
    ref,
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRef = (ref as React.MutableRefObject<TextInput>) || React.useRef<TextInput>(null);
    const [focusedState] = React.useState(new Animated.Value(props.autoFocus ? InputStates.Focused : InputStates.Unfocused));
    const [inputHegiht, setInputHeight] = React.useState(defaultInputHeight);
    const [labelHegiht, setLabelHeight] = React.useState(defaultLabelHeight);
    const [labelState] = React.useState(new Animated.Value(props.autoFocus ? LabelStates.Selected : LabelStates.Unselected));

    const containerPadding = (containerStyle && (containerStyle as {padding: number}).padding) || defaultPadding;

    const labelTop = labelState.interpolate({
      inputRange: [LabelStates.Unselected, LabelStates.Selected],
      outputRange: [inputHegiht / four, -labelHegiht / twice - twice],
    });

    const style = props.style as {fontSize?: number};
    const unselectedLabelFontSize = style && style.fontSize ? style.fontSize : defaultLabelSelectedSize;

    const fontSize = labelState.interpolate({
      inputRange: [LabelStates.Unselected, LabelStates.Selected],
      outputRange: [unselectedLabelFontSize, labelFontSize!],
    });

    const focusColor = focusedState.interpolate({
      inputRange: [InputStates.Unfocused, InputStates.Focused],
      outputRange: [inactiveColor, activeColor],
    });

    const labelBackground = (containerStyle && (containerStyle as {backgroundColor: string}).backgroundColor) || defaultBackgroundColor;

    const focusAnimation = useTimingAnimation(focusedState, InputStates.Focused, animationDuration);
    const labelFocusAnimation = useTimingAnimation(labelState, LabelStates.Selected, animationDuration);
    const blurAnimation = useTimingAnimation(focusedState, InputStates.Unfocused, animationDuration);
    const labelBlurAnimation = useTimingAnimation(labelState, LabelStates.Unselected, animationDuration);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      focusAnimation.start();
      if (props.onFocus) {
        props.onFocus(e);
      }
      if (value === '') {
        labelFocusAnimation.start();
      }
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      blurAnimation.start();
      if (props.onBlur) {
        props.onBlur(e);
      }
      if (value === '') {
        labelBlurAnimation.start();
      }
    };

    return (
      <Animated.View
        onLayout={(e: LayoutChangeEvent) => setInputHeight(e.nativeEvent.layout.height)}
        onTouchEnd={() => inputRef.current.focus()}
        style={[styles.container, {borderColor: focusColor}, containerStyle]}>
        <Animated.Text
          onLayout={(e: LayoutChangeEvent) => setLabelHeight(e.nativeEvent.layout.height)}
          style={[
            styles.label,
            {
              fontSize,
              top: labelTop,
              color: focusColor,
              left: containerPadding - labelPadding,
              backgroundColor: labelBackground,
            },
            labelStyle,
          ]}>
          {label}
        </Animated.Text>
        <TextInput ref={inputRef} {...props} onFocus={handleFocus} selectionColor={props.selectionColor || activeColor!} onBlur={handleBlur} />
      </Animated.View>
    );
  },
);
