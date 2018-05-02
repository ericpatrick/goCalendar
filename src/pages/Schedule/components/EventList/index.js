import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, FlatList, Text } from 'react-native';

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
];


export default class EventList extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  renderItems = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>{item.place}</Text>
    </View>
  );

  render() {
    return (
      <FlatList
        data={data}
        renderItem={this.renderItems}
        keyExtractor={item => String(item.id)}
        style={styles.list}
      />
    );
  }
}
