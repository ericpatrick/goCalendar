import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    paddingHorizontal: metrics.basePadding * 3,
    paddingVertical: metrics.basePadding,
  },
  markerContainer: {
    height: 25,
    width: 25,
    backgroundColor: colors.green,
    marginHorizontal: 3,
  },
  markerText: {
    color: colors.white,
    textAlign: 'center',
    flex: 1,
  },
});

styles = {
  ...styles,
  calendarTheme: {
    calendarBackground: colors.transparent,
    selectedDayBackgroundColor: colors.green,
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: 'rgba(255, 255, 255, 0.8)',
    textDisabledColor: 'rgba(255, 255, 255, 0.25)',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'rgba(255, 255, 255, 0.3)',
    monthTextColor: colors.white,
    textMonthFontWeight: 'bold',
    textDayFontSize: 12,
    textMonthFontSize: 16,
    'stylesheet.calendar.header': {
      dayHeader: {
        marginTop: 2,
        marginBottom: 7,
        width: 32,
        textAlign: 'center',
        fontSize: 13,
        // fontFamily: 'monospace',
        color: colors.white,
        fontWeight: 'bold',
      },
    },
  },
}

export default styles;
