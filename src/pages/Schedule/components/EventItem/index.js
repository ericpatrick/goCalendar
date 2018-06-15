import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Animated, PanResponder, Text, View, TouchableOpacity, Share  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as EventsCreators } from 'store/ducks/events';

import styles from './styles';

class EventItem extends Component {
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
        const { offsetX } = this.state;
        offsetX.setOffset(offsetX._value);

        offsetX.setValue(0);
      },

      // onPanResponderMove: Animated.event([null, {
      //   dx: this.state.offsetX,
      // }]),

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35 || gestureState.dx < -35) {
          let newX = (gestureState.dx >= 0)
            ? gestureState.dx - 35
            : gestureState.dx + 35;
          this.state.offsetX.setValue(newX);
        }
      },

      onPanResponderRelease: () => {
        const { offsetX } = this.state;
        const offsetValue = offsetX._value
        if (offsetValue < 0) {
          Animated.spring(this.state.offsetX, {
            toValue: offsetValue < -80 ? -110 : 0,
            bounciness: 5,
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

  onDelete = id => {
    this.props.removeEvent(id);
  };

  onShare = data => {
    const {dateTime, name, place} = data;
    Share.share({
      message: `${moment(dateTime).format('DD/MM/YYYY HH:mm')} - ${name} - ${place}`,
    }, {
      // Android only:
      dialogTitle: 'Share your event',
    })
  };

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.shareButton} onPress={() => this.onShare(data)}>
          <Icon name="share" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => this.onDelete(data.id)}>
          <Icon name="close" size={20} color="#FFF" />
        </TouchableOpacity>
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
            <Text style={styles.itemName}>{data.name}</Text>
            <Text style={styles.itemPlace}>{data.place}</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(EventsCreators, dispatch);
export default connect(null, mapDispatchToProps)(EventItem);
