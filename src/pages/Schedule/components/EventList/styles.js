import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingHorizontal: metrics.basePadding * 2,
    paddingTop: metrics.basePadding * 2,
  },
  listContent: {
    paddingTop: 350,
  },
});

export default styles;
