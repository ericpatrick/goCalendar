import React from 'react';

import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as EventsCreators } from 'store/ducks/events';
import { colors } from 'styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


const AddButton = ({ toggleNewEventVisible }) => (
  <TouchableOpacity style={styles.container} onPress={() => toggleNewEventVisible()}>
    <Icon name="plus" size={12} color={colors.white} />
  </TouchableOpacity>
);

const mapDispatchToProps = dispatch => bindActionCreators(EventsCreators, dispatch);
export default connect(null, mapDispatchToProps)(AddButton);
