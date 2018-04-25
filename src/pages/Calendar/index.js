import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import styles from './styles';

export default class Calendar extends Component {
  static navigationOptions = {
    title: 'SCHEDULER',
  };

  static propTypes = {};

  static state = {};

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}
