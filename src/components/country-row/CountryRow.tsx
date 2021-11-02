import React from 'react';
import {View, Text, Image, TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleProp} from 'react-native';

import {CircularProgress} from '../circular-progress/CircularProgress.component';
import {toLocaleStr} from '../../utils/to-locale-str';
import {Country} from '../../models/country';

import {dangerTintProgressColor, progressBackgroundColor, styles, tintProgressColor} from './country-row.styles';

interface Props extends Omit<TouchableOpacityProps, 'onPress'> {
  wrapperStyle?: StyleProp<ViewStyle>;
  showSeparator?: boolean;
  country: Country;
  onPress: (country: Country) => void;
}

const percentRatio = 100;

export const CountryRow: React.FC<Props> = ({country, onPress, showSeparator, style, wrapperStyle, ...rest}) => {
  const handlePress = () => onPress(country);

  return (
    <View style={[showSeparator && styles.separator, wrapperStyle]}>
      <TouchableOpacity {...rest} onPress={handlePress} style={[styles.wrapper, style]}>
        <Image style={styles.flag} source={{uri: `https://www.worldometers.info/img/flags/${country.countryCode.toLowerCase()}-flag.gif`}} />
        <View style={styles.statWrapper}>
          <Text style={styles.countryName}>{country.name}</Text>
          <Text style={styles.statText}>Active cases - {toLocaleStr(country.totalConfirmed)}</Text>
          <Text style={styles.statText}>Recovered - {toLocaleStr(country.totalRecovered)}</Text>
          <Text style={styles.statText}>Deaths - {toLocaleStr(country.totalDeaths)}</Text>
        </View>
        <CircularProgress
          size={64}
          width={3}
          fill={Math.round((country.totalDeaths / country.totalConfirmed) * percentRatio)}
          tintColor={tintProgressColor}
          dangerTintColor={dangerTintProgressColor}
          dangerValue={50}
          lineCap="round"
          backgroundColor={progressBackgroundColor}>
          {(fill: number) => <Text style={styles.progressText}>{fill}%</Text>}
        </CircularProgress>
      </TouchableOpacity>
    </View>
  );
};
