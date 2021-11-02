import React from 'react';
import {Text, View} from 'react-native';

import {DataItem} from '../../components/bar-chart/data-item.types';
import {BarChart} from '../../components/bar-chart/BarChart.component';
import {LinkButton} from '../../components/link-button/LinkButton.component';

import {padding, styles} from './styles/global-stat-card.styles';

interface Props {
  totalStat: Array<DataItem>;
  todayStat: Array<DataItem>;
}

enum Stat {
  Total = 'TOTAL',
  Today = 'TODAY',
}

const titles = {
  [Stat.Today]: 'Today Statistics',
  [Stat.Total]: 'Total Statistics',
};

export const GlobalStatCard: React.FC<Props> = ({totalStat, todayStat}) => {
  const [selectedStat, setSelectedStat] = React.useState(Stat.Total);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{titles[selectedStat]}</Text>
      <BarChart data={selectedStat === Stat.Total ? totalStat : todayStat} paddingHorizontal={padding} />
      <View style={styles.buttonsWrapper}>
        <LinkButton onPress={() => setSelectedStat(Stat.Today)} textStyle={selectedStat === Stat.Today && styles.activeButtonText} text="Today" />
        <LinkButton onPress={() => setSelectedStat(Stat.Total)} textStyle={selectedStat === Stat.Total && styles.activeButtonText} text="Total" />
      </View>
    </View>
  );
};
