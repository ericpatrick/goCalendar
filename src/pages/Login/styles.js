import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding * 2,
    backgroundColor: colors.primary,
  },

  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: metrics.baseMargin * 6,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkPurple,
    borderRadius: metrics.baseRadius,
    marginTop: metrics.baseMargin,
  },

  callNumber: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: colors.darkPurple,
    color: colors.transparentWhite,
  },

  icon: {
    padding: 10,
  },

  buttonContainer: {
    marginTop: metrics.baseMargin * 2,
    width: '100%',
  },

  button: {
    height: 54,
    backgroundColor: colors.secondary,
    borderRadius: metrics.baseRadius,
    justifyContent: 'center',
  },

  buttonLabel: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
