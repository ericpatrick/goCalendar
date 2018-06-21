import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, ActivityIndicator, ScrollView, PanResponder } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as EventsCreators } from 'store/ducks/events';

import EventItem from 'pages/Schedule/components/EventItem';

import { colors } from 'styles';
import styles from './styles';


class EventList extends Component {
  static propTypes = {
    onScroll: PropTypes.func,
    events: PropTypes.shape({
      currentEvents: PropTypes.array,
      loading: PropTypes.bool,
    }).isRequired,
    loadEvents: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onScroll: () => {},
  };

  state = {};

  scroolTo = (el) => {
    if (el) {
      // TODO: Descobrir o porque da necessidade desse delay
      setTimeout(() => el.scrollToOffset({
        offset: this.props.contentOffset,
        animated: false
      }), 50);
    }
  };

  renderBlankList = () => (
    <View style={styles.blankContainer}>
      <Text style={styles.blankLabel}>Você ainda não possui eventos nesta data</Text>
    </View>
  );

  renderList = currentEvents => (
    currentEvents.length > 0
      ? (
        <FlatList
          ref={this.scroolTo}
          data={currentEvents}
          renderItem={({ item }) => <EventItem data={item} />}
          keyExtractor={item => String(item.id)}
          scrollEventThrottle={16}
          onScroll={this.props.onScroll}
          horizontal={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )
      : this.renderBlankList()
  );

  // renderList = currentEvents => (
  //   currentEvents.length > 0
  //     ? (
  //     <View style={{ marginTop: 350, height: 300, width: '100%'}}>
  //       <ScrollView
  //         ref={this.scroolTo}
  //         style={[styles.list]}
  //       >
  //         {
  //           currentEvents.map(item => (
  //             <EventItem key={Math.random()} data={item} />
  //           ))
  //         }
  //       </ScrollView>
  //     </View>
  //     )
  //     : this.renderBlankList()
  // );

  render() {
    const { currentEvents, loading } = this.props.events;
    return loading
      ? (<ActivityIndicator size="large" color={colors.transparentWhite} style={styles.loading} />)
      : this.renderList(currentEvents);
  }
}

const mapStateToProps = state => ({
  events: state.events,
});
const mapDispatchToProps = dispatch => bindActionCreators(EventsCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EventList);
