import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as UserCreators } from 'store/ducks/user';
import { PhoneStatus } from 'store/models';

import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'styles';

import styles from './styles';

class Identify extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    user: PropTypes.shape({
      phoneStatus: PropTypes.number.isRequired,
    }).isRequired,
    checkPhone: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    phone: '',
  };

  componentWillReceiveProps(nextProps) {
    const { phoneStatus } = nextProps.user;
    if (phoneStatus === PhoneStatus.REGISTERED) {
      this.changeToToute('Login')
    } else if (phoneStatus === PhoneStatus.UNREGISTERED) {
      this.changeToToute('Register')
    }
  }

  changeToToute = (route) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: route }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  checkPhone = () => {
    this.props.checkPhone(this.state.phone);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SCHEDULER</Text>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color={colors.transparentWhite} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            placeholder="Seu número de telefone"
            style={styles.callNumber}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.transparentWhite}
            value={this.state.phone}
            onChangeText={text => this.setState({ phone: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.checkPhone()}
        >
          <Text style={styles.buttonLabel}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchTOProps = dispatch => bindActionCreators(UserCreators, dispatch);

export default connect(mapStateToProps, mapDispatchTOProps)(Identify);
