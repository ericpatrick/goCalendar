import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { LocaleConfig, Calendar as WixCalendar } from 'react-native-calendars';

import { colors } from 'styles';

import styles from './styles'

export default class Calendar extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    date: '',
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
    this.setState({
      date: day.dateString,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <WixCalendar
          current={this.state.date}
          // minDate='2016-05-01'
          // maxDate='2016-06-30'
          onDayPress={this.onDayPress}
          onDayLongPress={(day) => {console.log('selected day', day)}}
          monthFormat='MMMM'
          onMonthChange={(month) => {console.log('month changed', month)}}
          hideArrows={false}
          markingType={'custom'}
          markedDates={{
            [this.state.date]: {
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
      </View>
    );
  }
}
