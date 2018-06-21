import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingHorizontal: metrics.basePadding * 2,
    marginTop: 80,
  },
  listContent: {
    paddingTop: 290,
  },

  blankContainer: {
    paddingTop: 370,
  },

  blankLabel: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
  },

  loading: {
    paddingTop: 370,
  },
});

export default styles;
