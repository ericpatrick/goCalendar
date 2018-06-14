import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as EventsCreators } from 'store/ducks/events';
import Helpers from 'helpers';

import EventItem from 'pages/Schedule/components/EventItem';

import styles from './styles';


class EventList extends Component {
  static propTypes = {
    onScroll: PropTypes.func,
  };

  static defaultProps = {
    onScroll: () => {},
  };

  state = {};

  componentWillMount() {
    this.props.loadEvents();
  }

  render() {
    const { currentEvents } = this.props;
    return (
      <FlatList
        data={currentEvents}
        renderItem={({ item }) => <EventItem data={item} />}
        keyExtractor={item => String(item.id)}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentEvents: state.events.currentEvents,
});
const mapDispatchToProps = dispatch => bindActionCreators(EventsCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EventList);
