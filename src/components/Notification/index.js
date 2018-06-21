import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NotificationCreators } from 'store/ducks/notification';

import styles from './styles';

class Notification extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    modalMode: PropTypes.bool.isRequired,
    embedded: PropTypes.bool,
    clear: PropTypes.func.isRequired,
  };

  static defaultProps = {
    embedded: false,
  };

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
    const { isError, message, embedded, modalMode } = this.props;
    const containerStyle = [styles.container];

    if (isError) {
      containerStyle.push(styles.danger);
    }

    containerStyle.push({
      transform: [{
        translateY: this.state.translateY,
      }],
    });

    if (message && embedded === modalMode) {
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
  const { isError, message, duration, modalMode } = state.notification;
  return {
    message,
    isError,
    duration,
    modalMode,
  };
};
const mapDIspatchToProps = dispatch => bindActionCreators(NotificationCreators, dispatch);
export default connect(mapStateToProps, mapDIspatchToProps)(Notification);
