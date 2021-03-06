import { StyleSheet } from 'react-native';
import { colors, general, metrics } from 'styles';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.transparentBlack,
    zIndex: -1,
  },
  container: {
    position: 'absolute',
    // top: (metrics.screenHeight / 2) - 100,
    top: '20%',
    left: 20,
    width: metrics.screenWidth - 40,
    backgroundColor: colors.white,
    padding: metrics.basePadding * 2,
    borderRadius: metrics.baseRadius,
  },
  title: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: metrics.baseMargin * 3,
    textAlign: 'center',
  },
  dateContainer: {
    ...general.box,
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.baseMargin,
  },
  datePickerContainer: {
    flex: 1,
    marginBottom: 0,
    padding: 0,
    borderWidth: 0,
    marginLeft: 10,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  placeholderText: {
    color: colors.darkGray,
  },
  dateText: {
    color: colors.darkerGray,
  },
  input: {
    ...general.box,
    marginBottom: metrics.baseMargin,
    borderColor: colors.lightGray,
    borderRadius: metrics.baseRadius,
    borderWidth: 1,
    backgroundColor: colors.lightGray,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    borderRadius: metrics.baseRadius,
    height: 42,
    paddingVertical: metrics.basePadding / 2,
    flex: 1,
    justifyContent: 'center',
    marginTop: metrics.baseMargin,
  },
  buttonLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.white,
  },
  cancelButtonLabel: {
    color: colors.darkGray,
  },
  saveButton: {
    backgroundColor: colors.secondary,
  },
  cancelButton: {
    backgroundColor: colors.white,
  },
});

export default styles;
