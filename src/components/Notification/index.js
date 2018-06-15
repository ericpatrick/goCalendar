import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NotificationCreators } from 'store/ducks/notification';

import styles from './styles';

class Notification extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    translateY: new Animated.Value(0),
  };

  showMessage = () => {
    Animated.sequence([
      Animated.timing(
        this.state.translateY,
        {
          toValue: 60,
          duration: 500,
        }
      ),
      Animated.delay(this.props.duration),
      Animated.timing(
        this.state.translateY,
        {
          toValue: 0,
          duration: 500,
        }
      ),
    ]).start(() => this.props.clear());
  };

  render() {
    let containerStyle = [styles.container];

    if (this.props.isError) {
      containerStyle = containerStyle.push(styles.danger);
    }

    containerStyle.push({
      transform: [{
        translateY: this.state.translateY,
      }],
    });

    console.tron.log('COMPONENT: getDerivedStateFromProps');
    console.tron.log(this.props);
    if (this.props.message) {
      this.showMessage();
    }

    return (
      <Animated.View style={containerStyle}>
        <Text style={styles.content}>{this.props.message}</Text>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  const { isError, message, duration } = state.notification;
  return {
    message,
    isError,
    duration
  };
};
const mapDIspatchToProps = dispatch => bindActionCreators(NotificationCreators, dispatch);
export default connect(mapStateToProps, mapDIspatchToProps)(Notification);
