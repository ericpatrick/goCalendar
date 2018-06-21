import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as UserCreators } from 'store/ducks/user';

import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'styles';

import styles from './styles';

class Register extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    user: PropTypes.shape({
      phoneNumber: PropTypes.string,
      loading: PropTypes.bool
    }).isRequired,
    auth: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
    createUser: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    fullName: '',
    password: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.token) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Schedule' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  register = () => {
    const { phoneNumber } = this.props.user;
    this.props.createUser({
      username: phoneNumber,
      fullName: this.state.fullName,
      password: this.state.password,
    });
  };

  renderButton = () => {
    const { loading } = this.props.user;
    return loading
      ? (<ActivityIndicator size="large" color={colors.transparentWhite} />)
      : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.register()}
        >
          <Text style={styles.buttonLabel}>Criar conta grátis</Text>
        </TouchableOpacity>
      );
  };

  render() {
    const { phoneNumber } = this.props.user;
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
            value={phoneNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color={colors.transparentWhite} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nome completo"
            style={styles.callNumber}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.transparentWhite}
            value={this.state.fullName}
            onChangeText={text => this.setState({ fullName: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.transparentWhite} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Sua senha secreta"
            style={styles.callNumber}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.transparentWhite}
            secureTextEntry
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.buttonContainer}>
          {
            this.renderButton()
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});
const mapDispatchTOProps = dispatch => bindActionCreators(UserCreators, dispatch);

export default connect(mapStateToProps, mapDispatchTOProps)(Register);
