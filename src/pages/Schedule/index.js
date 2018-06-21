import React, { Component } from 'react';

import { View, Animated } from 'react-native';

import AddButton from './components/AddButton';
import AccountButton from './components/AccountButton';
import HeaderTitle from './components/HeaderTitle';
import Calendar from './components/Calendar';
import EventList from './components/EventList';
import NewEvent from './components/NewEvent';

import styles from './styles';

export default class Schedule extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle />,
    headerLeft: <AddButton />,
    headerRight: <AccountButton onPress={() => navigation.navigate('Account')} />,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  });

  static propTypes = {};

  state = {
    scrollOffset: new Animated.Value(0),
    isCalendarDayView: false,
  };

  listScroll = (touchEvent) => {
    const { y } = touchEvent.nativeEvent.contentOffset;
    const isCalendarDayView = y > 250;
    this.setState({ isCalendarDayView });
    const { scrollOffset } = this.state;
    scrollOffset.setValue(y);
  };

  render() {
    return (
      <View style={styles.container}>
        <EventList
          onScroll={this.listScroll}
          contentOffset={this.state.scrollOffset._value}
        />
        <Calendar
          containerStyle={{
            height: this.state.scrollOffset.interpolate({
              inputRange: [0, 290],
              outputRange: [350, 60],
              extrapolate: 'clamp',
            }),
          }}
          isDayView={this.state.isCalendarDayView}
        />
        <NewEvent />
      </View>
    );
  }
}
