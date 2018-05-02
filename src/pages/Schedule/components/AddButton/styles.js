import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    marginLeft: metrics.baseMargin * 2,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
