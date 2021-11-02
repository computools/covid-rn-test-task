import {Animated} from 'react-native';

export const useTimingAnimation = (value: Animated.Value, toValue: number, duration: number, useNativeDriver = false) =>
  Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver,
  });
