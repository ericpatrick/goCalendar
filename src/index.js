import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createRootNavigator from 'routes';
import Parse from 'parse/react-native';
import codePush from 'react-native-code-push';

import { AsyncStorage, StyleSheet, View } from 'react-native';
import Helpers from 'helpers';

import 'config/ReactotronConfig';
import 'config/DevtoolsConfig';

import store from 'store';
import { Creators as AuthCreators} from 'store/ducks/auth';

import Notification from 'components/Notification';

class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor() {
    super();

    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize(Helpers.parseAppId);
    Parse.serverURL = 'https://gocalendar-parse.herokuapp.com/parse';
  }

  state = {
    token: null,
  };

  async componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const { token } = state.auth;
      if (this.state.token !== token) {
        this.setState({ token });
      }
    });
    store.dispatch(AuthCreators.checkAuth());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.token === null) return null;

    const Routes = createRootNavigator(!!this.state.token);

    return (
      <Provider store={store}>
        <View style={StyleSheet.absoluteFill}>
          <Routes />
          <Notification />
        </View>
      </Provider>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App)
