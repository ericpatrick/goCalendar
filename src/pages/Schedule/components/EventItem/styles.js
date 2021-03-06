import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: metrics.baseMargin,
  },
  itemContent: {
    ...general.box,
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemPlace: {
    fontSize: 12,
    color: colors.gray,
  },
  shareButton: {
    ...general.box,
    position: 'absolute',
    top: 0,
    bottom: 5,
    left: 0,
    backgroundColor: colors.blue,
    height: 75,
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    ...general.box,
    position: 'absolute',
    top: 0,
    bottom: 10,
    right: 0,
    backgroundColor: colors.danger,
    height: 75,
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
