import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import createRootNavigator from 'routes';
import Parse from 'parse/react-native';

import { AsyncStorage } from 'react-native';
import Helpers from 'helpers';

import 'config/ReactotronConfig';
import 'config/DevtoolsConfig';

import store from 'store';
import { Creators as AuthCreators} from 'store/ducks/auth';

import Notification from 'components/Notification';

export default class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor() {
    super();

    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize(Helpers.parseAppId);
    Parse.serverURL = 'http://192.168.25.8:1337/parse';
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
        <Fragment>
          <Routes />
          <Notification />
        </Fragment>
      </Provider>
    );
  }
}
