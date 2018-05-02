import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import AddButton from './components/AddButton';
import AccountButton from './components/AccountButton';
import HeaderTitle from './components/HeaderTitle';
import Calendar from './components/Calendar';
import EventList from './components/EventList';

import styles from './styles';

export default class Schedule extends Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle />,
    headerLeft: <AddButton />,
    headerRight: <AccountButton />,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  };

  static propTypes = {};

  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Calendar />
        <EventList />
      </View>
    );
  }
}
