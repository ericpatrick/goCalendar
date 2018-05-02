import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import { colors } from 'styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const AccountButton = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Icon name="user" size={20} color={colors.white} />
  </TouchableOpacity>
);

AccountButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default AccountButton;
