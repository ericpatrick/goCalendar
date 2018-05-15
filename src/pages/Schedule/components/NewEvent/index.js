import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';

import styles from './styles';

export default class NewEvent extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    date: '',
    eventName: '',
    eventPlace: '',

    loading: false,
    visible: true,
  };

  cancelInput = () => {
    this.setState({ visible: false });
  };

  renderButtons() {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={() => this.saveUser()}
        >
          <Text style={styles.buttonLabel}>Criar evento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => this.cancelInput()}
        >
          <Text style={[styles.buttonLabel, styles.cancelButtonLabel]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { loading, visible } = this.state;
    console.tron.log(this.state.timeIcon);
    return (
      <Modal
        animationType="fade"
        visible={visible}
        transparent
        // onRequestClose={() => toggleModal()}
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Criar evento</Text>
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={20} colors={colors.darkGray} />
            <DatePicker
              style={styles.datePickerContainer}
              date={this.state.date}
              mode="datetime"
              placeholder="Selecione data e horário"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: styles.dateInput,
                placeholderText: styles.placeholderText,
                dateText: styles.dateText,
              }}
              onDateChange={(date) => { this.setState({ date })} }
            />
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Qual o nome do evento?"
            placeholderTextColor={colors.darkGray}
            underlineColorAndroid="transparent"
            value={this.state.eventName}
            onChangeText={eventName => this.setState({ eventName })}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Onde irá ocorrer?"
            placeholderTextColor={colors.darkGray}
            underlineColorAndroid="transparent"
            value={this.state.eventPlace}
            onChangeText={eventPlace => this.setState({ eventPlace })}
          />

          { loading
            ? <ActivityIndicator size="large" color={colors.black} />
            : this.renderButtons()
          }

        </View>
      </Modal>
    );
  }
}
