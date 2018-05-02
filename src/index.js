import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createRootNavigator from 'routes';

import { AsyncStorage } from 'react-native';
import Helpers from 'helpers';

import 'config/ReactotronConfig';
import 'config/DevtoolsConfig';

import store from 'store';
import { Creators as AuthCreators} from 'store/ducks/auth';

export default class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    token: '',
    authChecked: false,
  };

  async componentWillMount() {
    // await AsyncStorage.clear();
    // await AsyncStorage.setItem('@goCalendar:token', '123');
    const key = Helpers.getStorageKey('token');
    const token = await AsyncStorage.getItem(key);
    store.dispatch(AuthCreators.updateToken(token));
    this.setState({ token, authChecked: true });
  }

  render() {
    if (!this.state.authChecked) return null;

    const Routes = createRootNavigator(!!this.state.token);

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
