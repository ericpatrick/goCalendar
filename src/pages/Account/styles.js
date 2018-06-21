import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '70%',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  titleContainer: {
    backgroundColor: colors.darkPurple,
    width: '100%',
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: metrics.baseMargin,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkPurple,
    borderRadius: metrics.baseRadius,
    marginTop: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin * 2,
  },
  input: {
    flex: 1,
    paddingTop: metrics.basePadding,
    paddingRight: metrics.basePadding,
    paddingBottom: metrics.basePadding,
    paddingLeft: 0,
    backgroundColor: colors.darkPurple,
    color: colors.transparentWhite,
  },
  icon: {
    padding: metrics.basePadding,
  },
  divider: {
    borderBottomColor: colors.darkPurple,
    borderBottomWidth: 1,
    marginTop: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin * 2,
  },
  buttonContainer: {
    marginTop: metrics.baseMargin * 2,
  },
  button: {
    height: 54,
    backgroundColor: colors.secondary,
    borderRadius: metrics.baseRadius,
    marginHorizontal: metrics.baseMargin * 2,
    justifyContent: 'center',
  },
  buttonLabel: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
