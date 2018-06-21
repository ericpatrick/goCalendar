import React from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse/react-native';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthCreators } from 'store/ducks/auth';

import { colors } from 'styles';
import styles from './styles';

const LogoutButton = ({ updateToken }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => {
      // TODO: Mover para o redux-saga quando o bug do logout for resolvido
      Parse.User.logOut().then(() => {
        updateToken('');
      });
    }}
  >
    <Icon name="sign-out" size={20} color={colors.white} />
  </TouchableOpacity>
);

LogoutButton.propTypes = {
  updateToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(AuthCreators, dispatch);
export default connect(null, mapDispatchToProps)(LogoutButton);
