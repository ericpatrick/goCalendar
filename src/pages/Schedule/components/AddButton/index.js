import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import { colors } from 'styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


const AddButton = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Icon name="plus" size={12} color={colors.white} />
  </TouchableOpacity>
);

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};


export default AddButton;
