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
    headerLeft: <AddButton onPress={() => {}} />,
    headerRight: <AccountButton onPress={() => navigation.navigate('Account')} />,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  });

  static propTypes = {};

  state = {
    scrollOffset: new Animated.Value(0),
  };

  render() {
    return (
      <View style={styles.container}>
        <EventList
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: { y: this.state.scrollOffset },
            },
          }])}
        />
        <Calendar
          containerStyle={{
            height: this.state.scrollOffset.interpolate({
              inputRange: [0, 290],
              outputRange: [350, 60],
              extrapolate: 'clamp',
            }),
          }}
        />
        <NewEvent />
      </View>
    );
  }
}
