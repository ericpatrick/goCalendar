import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, TouchableOpacity, Divi } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';
import styles from './styles'

export default class Account extends Component {
  static navigationOptions = {
    title: 'SCHEDULER',
    headerTintColor: colors.white,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  };
  static propTypes = {};

  static defaultProps = {};

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
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
            keyboardType="numeric"
            placeholder="Qual seu nome completo?"
            style={styles.input}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.transparentWhite}
            value={this.state.username}
            onChangeText={text => this.setState({ username: text })}
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
          onPress={() => this.register()}
        >
          <Text style={styles.buttonLabel}>Alterar informações</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
