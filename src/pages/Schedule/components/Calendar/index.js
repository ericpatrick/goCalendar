import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

import { View, Animated } from 'react-native';
import { LocaleConfig, Calendar as WixCalendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as EventsCreators } from 'store/ducks/events';

import { colors } from 'styles';

import styles from './styles'

class Calendar extends Component {
  static propTypes = {
    containerStyle: PropTypes.shape(),
  };

  static defaultProps = {
    containerStyle: null,
  };

  componentWillMount() {
    LocaleConfig.locales['pt-br'] = {
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    };

    LocaleConfig.defaultLocale = 'pt-br';
  }

  onDayPress = (day) => {
    const date = day.dateString;

    this.props.changeCurrentDate(date);
  };

  backDate = (substractMonth) => {
    if (this.props.isDayView) {
      let { currentDate } = this.props;
      currentDate = currentDate.subtract(1, 'days').format('YYYY-MM-DD');
      this.props.changeCurrentDate(currentDate);
    } else {
      substractMonth();
    }
  };

  nextDate = (addMounth) => {
    if (this.props.isDayView) {
      let { currentDate } = this.props;
      currentDate = currentDate.add(1, 'days').format('YYYY-MM-DD');
      this.props.changeCurrentDate(currentDate);
    } else {
      addMounth();
    }
  };

  render() {
    const { currentDate } = this.props;
    let { containerStyle } = this.props;

    containerStyle = containerStyle
      ? [styles.container, containerStyle]
      : styles.container;

    const date = currentDate.format('YYYY-MM-DD');
    const calendarFormat = this.props.isDayView
      ? 'ddd, d \'de\' MMM'
      : 'MMMM';

    return (
      <Animated.View style={containerStyle}>
        <WixCalendar
          current={date}
          // minDate='2016-05-01'
          // maxDate='2016-06-30'
          onDayPress={this.onDayPress}
          monthFormat={calendarFormat}
          onMonthChange={(month) => { console.log(`month changed: ${month}`); }}
          hideArrows={false}
          disableMonthChange
          onPressArrowLeft={this.backDate}
          onPressArrowRight={this.nextDate}
          markingType="custom"
          markedDates={{
            [date]: {
              selected: true,
              disableTouchEvent: true,
              customStyles: {
                container: styles.markerContainer,
                text: styles.markerText,
              },
            },
          }}
          theme={styles.calendarTheme}
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  currentDate: state.events.currentDate,
});
const mapDispatchToProps = dispatch => bindActionCreators(EventsCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
