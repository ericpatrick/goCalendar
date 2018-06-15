import React, { Component } from 'react';

import {
  View,
  Text,
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as EventsCreators} from 'store/ducks/events';
import Helpers from 'helpers';
import { colors } from 'styles';

import styles from './styles';

class NewEvent extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    date: '',
    eventName: '',
    eventPlace: '',

    loading: false,
  };

  cancelInput = () => {
    this.props.toggleNewEventVisible();
  };

  addEvent = () => {
    const { date, eventName, eventPlace } = this.state;
    if (date.length > 0 && eventName.length > 0 && eventPlace.length > 0) {
      // const key = Helpers.getStorageKey('token');
      // const uid = await AsyncStorage.getItem(key);
      this.props.addEvent({
        date,
        name: eventName,
        place: eventPlace,
      });
    }
  };

  renderButtons() {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={() => this.addEvent()}
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
    const { loading } = this.state;
    return (
      <Modal
        animationType="fade"
        visible={this.props.visible}
        transparent
        onRequestClose={() => {}}
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
              format="YYYY-MM-DD HH:mm"
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
              onDateChange={(date) => { this.setState({ ...this.state, date }); }}
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
            onChangeText={eventName => this.setState({ ...this.state, eventName })}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Onde irá ocorrer?"
            placeholderTextColor={colors.darkGray}
            underlineColorAndroid="transparent"
            value={this.state.eventPlace}
            onChangeText={eventPlace => this.setState({ ...this.state, eventPlace })}
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

const mapStateToProps = state => ({
  visible: state.events.newEventVisible,
});
const mapDispatchToProps = dispatch => bindActionCreators(EventsCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
