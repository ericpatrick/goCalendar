import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: metrics.basePadding * 2,
    backgroundColor: colors.primary,
  },

  calendarContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    paddingHorizontal: metrics.basePadding * 3,
    paddingVertical: metrics.basePadding,
  },

  headerStyle: {
    backgroundColor: colors.primary,
  },

  headerTitleStyle: {
    textAlign: 'center',
  }
});

export default styles;
