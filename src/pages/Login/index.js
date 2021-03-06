import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as AuthCreators } from 'store/ducks/auth';

import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'styles';

import styles from './styles';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    user: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      token: PropTypes.string,
      loading: PropTypes.bool,
    }).isRequired,
    authenticate: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
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

  login = () => {
    this.props.authenticate(this.props.user.phoneNumber, this.state.password);
  };

  renderButton = () => {
    const { loading } = this.props.auth;
    return loading
      ? (<ActivityIndicator size="large" color={colors.transparentWhite} />)
      : (
        <TouchableOpacity
          id="sign-in-button"
          style={styles.button}
          onPress={() => this.login()}
        >
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={-200}>
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
            value={this.props.user.phoneNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.transparentWhite} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Sua senha screta"
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
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});
const mapDispatchTOProps = dispatch => bindActionCreators(AuthCreators, dispatch);

export default connect(mapStateToProps, mapDispatchTOProps)(Login);
