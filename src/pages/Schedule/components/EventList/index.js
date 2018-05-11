import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FlatList } from 'react-native';

import EventItem from 'pages/Schedule/components/EventItem';

import styles from './styles';

const data = [
  {
    id: 1,
    date: '2018-05-01',
    name: 'Estudar React Native',
    place: 'Casa',
  },
  {
    id: 2,
    date: '2018-05-01',
    name: 'Comprar livro',
    place: 'Centro de Goiânia',
  },
  {
    id: 3,
    date: '2018-05-01',
    name: 'Pesquisar terno',
    place: 'Campinas',
  },
  {
    id: 4,
    date: '2018-05-01',
    name: 'Abastecer o carro',
    place: 'Campinas',
  },
  {
    id: 5,
    date: '2018-05-05',
    name: 'Abastecer a moto',
    place: 'Campinas',
  },
];


export default class EventList extends Component {
  static propTypes = {
    onScroll: PropTypes.func,
  };

  static defaultProps = {
    onScroll: () => {},
  };

  state = {};

  render() {
    return (
      <FlatList
        data={data}
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
