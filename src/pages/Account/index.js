import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserCreators } from 'store/ducks/user';

import { colors } from 'styles';
import styles from './styles'

class Account extends Component {
  static navigationOptions = {
    title: 'SCHEDULER',
    headerTintColor: colors.white,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  };
  static propTypes = {};

  static defaultProps = {};

  static getDerivedStateFromProps(props, state) {
    const { fullName } = props;
    if (fullName !== state.fullName) {
      return {
        ...state,
        fullName,
      };
    }

    return state;
  }

  state = {
    fullName: '',
    password: '',
    passwordConfirmation: '',
  };

  componentDidMount() {
    this.props.loadUser();
  }

  save = () => {
    const { fullName, password, passwordConfirmation} = this.state;
    const params = {
      fullName,
    };
    if (password) {
      if (password === passwordConfirmation) {
        params.password = password;
      } else return;
    }

    this.props.saveUser(params);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Minha Conta</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color={colors.transparentWhite} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Qual seu nome completo?"
            style={styles.input}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.transparentWhite}
            value={this.state.fullName}
            onChangeText={text => this.setState({ fullName: text })}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.transparentWhite} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Quer alterar sua senha?"
            style={styles.input}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.transparentWhite}
            secureTextEntry
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={colors.transparentWhite} style={styles.icon} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirme a senha digitada"
            style={styles.input}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.transparentWhite}
            secureTextEntry
            value={this.state.passwordConfirmation}
            onChangeText={text => this.setState({ passwordConfirmation: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.save()}
        >
          <Text style={styles.buttonLabel}>Alterar informações</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fullName: state.user.fullName,
});
const mapDispatchToProps = dispatch => bindActionCreators(UserCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Account);
