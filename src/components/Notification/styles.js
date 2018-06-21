import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -60,
    left: 0,
    height: 60,
    width: '100%',
    backgroundColor: colors.secondary,
    paddingHorizontal: metrics.baseMargin * 2,
    // paddingVertical: metrics.baseMargin,
    zIndex: 99999999,
  },

  content: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  danger: {
    backgroundColor: colors.danger,
  },
});

export default styles;
