import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Animated, PanResponder, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

import styles from './styles';

export default class EventItem extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    offsetX: new Animated.Value(0),
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderTerminationRequest: () => false,

      onMoveShouldSetResponderCapture: () => true,
      // onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        const {offsetX} = this.state;
        offsetX.setOffset(offsetX._value);

        offsetX.setValue(0);
      },

      onPanResponderMove: Animated.event([null, {
        dx: this.state.offsetX,
      }]),

      onPanResponderRelease: () => {
        console.tron.log(this.state.offsetX._value);
        const { offsetX } = this.state;
        const offsetValue = offsetX._value
        if (offsetValue < 0) {
          Animated.spring(this.state.offsetX, {
            toValue: offsetValue < -80 ? -110 : 0,
            bounciness: 10,
          }).start();
        }

        if (offsetValue >= 0) {
          Animated.spring(this.state.offsetX, {
            toValue: offsetValue > 80 ? 110 : 0,
            bounciness: 10,
          }).start();
        }

        offsetX.flattenOffset();
      },
    });
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.shareButton}>
          <Icon name="share" size={20} color="#FFF" />
        </View>
        <View style={styles.deleteButton}>
          <Icon name="close" size={20} color="#FFF" />
        </View>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[
            styles.itemContainer,
            {
              transform: [
                {
                  translateX: this.state.offsetX,
                },
              ],
            }
          ]}
        >
          <View style={styles.itemContent}>
            <Text>{data.name}</Text>
            <Text>{data.place}</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}
