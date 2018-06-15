import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import createRootNavigator from 'routes';
import Parse from 'parse/react-native';

import { AsyncStorage, View } from 'react-native';
import Helpers from 'helpers';

import 'config/ReactotronConfig';
import 'config/DevtoolsConfig';

import store from 'store';
import { Creators as AuthCreators} from 'store/ducks/auth';

import Notification from 'components/Notification';

export default class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    token: '',
    authChecked: false,
  };

  constructor() {
    super();

    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize('123');
    Parse.serverURL = 'http://192.168.25.8:1337/parse';
  }

  saveObject = () => {
    const GameScore = Parse.Object.extend('GameScore');
    const gameScore = new GameScore();

    gameScore.set('score', 1337);
    gameScore.set('playerName', 'Sean Plott');
    gameScore.set('cheatMode', false);

    gameScore.save(null, {
      success: (gameScore) => {
        // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + gameScore.id);
        console.tron.log(gameScore.id);
      },
      error: (gameScore, error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
        console.tron.log(error.message);
      }
    });
  };

  loadObject = () => {
    const GameScore = Parse.Object.extend('GameScore');
    const query = new Parse.Query(GameScore);
    query.get("HcH8S9Vq5m", {
      success: (gameScore) => {
        // The object was retrieved successfully.
        alert('Object loaded with objectId: ' + gameScore.id);
        console.tron.log(gameScore);
      },
      error: (object, error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        alert('Failed to load object, with error code: ' + error.message);
        console.tron.log(error.message);
      }
    });
  };

  signup = () => {
    const user = new Parse.User();
    user.set('username', 'my name');
    user.set('password', 'my pass');
    user.set('email', 'email@example.com');

    // other fields can be set just like with Parse.Object
    user.set('phone', '415-392-0202');

    user.signUp(null, {
      success: (user) => {
        // Hooray! Let them use the app now.
        alert('User signup: ' + user.id);
        console.tron.log(user);
      },
      error: (user, error) => {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
        console.tron.log(error.message);
      }
    });
  };

  login = () => {
    Parse.User.logIn("my name", "my pass", {
      success: (user) => {
        // Do stuff after successful login.
        // alert('User logged: ', user.id);
        console.tron.log(user);
      },
      error: (user, error) => {
        // The login failed. Check error to see why.
        alert('Error on login: ' + error.message);
        console.tron.log(error);
        console.tron.log(Parse.User.current());
      }
    });
  };

  saveAuthObject = async () => {
    const GameScore = Parse.Object.extend('GameScore');
    const gameScore = new GameScore();

    const user = await Parse.User.currentAsync();
    const date = new Date(2018,12,7);
    gameScore.set('score', 1337);
    gameScore.set('playerName', 'Sean Plott Private with other date');
    gameScore.set('cheatMode', false);
    gameScore.set('dateTime', date);
    gameScore.setACL(new Parse.ACL(user));

    gameScore.save(null, {
      success: (gameScore) => {
        // Execute any logic that should take place after the object is saved.
        alert('New private object created with objectId: ' + gameScore.id);
        console.tron.log(gameScore);
      },
      error: (gameScore, error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new private object, with error code: ' + error.message);
        console.tron.log(error.message);
      }
    });
  };

  deleteObject = () => {
    const GameScore = Parse.Object.extend('GameScore');
    const query = new Parse.Query(GameScore);
    query.get("5IQO9zhDNr", {
      success: (gameScore) => {
        // The object was retrieved successfully.
        console.tron.log(gameScore);
        gameScore.destroy({
          success: (myObject) => {
            // The object was deleted from the Parse Cloud.
            alert('Object deleted with objectId: ' + myObject.id);
          },
          error: (myObject, error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            alert('Failed to delete object, with error code: ' + error.message);
            console.tron.log(error.message);
          }
        });
      },
      error: (object, error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        alert('Failed to load object, with error code: ' + error.message);
        console.tron.log(error.message);
      }
    });
  };

  queryObjects = async () => {
    const GameScore = Parse.Object.extend("GameScore");
    const query = new Parse.Query(GameScore);
    // query.equalTo("playerName", "Dan Stemkoski");
    // query.lessThanOrEqualTo("dateTime", new Date(2018,7,7));
    // query.greaterThanOrEqualTo("dateTime", new Date(2018,7,7));
    query.descending("dateTime");
    query.find({
      // sessionToken: user.getSessionToken(),
      success: function(results) {
        // alert("Successfully retrieved " + results.length + " scores.");
        alert("Times: " + results[0].get("dateTime"));
        // Do something with the returned Parse.Object values
        console.tron.log(results);
      },
      error: function(error) {
        alert("Error on query: " + error.code + " " + error.message);
      }
    });
  };

  checkUser = () => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("username", "my name");
    query.find({
      success: (user) => {
        alert("User finded");
        console.tron.log(user);
      },
      error: () => {
        alert("User not found");
      },
    });
  };

  async componentWillMount() {
    // await AsyncStorage.clear();
    // await AsyncStorage.setItem('@goCalendar:token', '123');
    const key = Helpers.getStorageKey('token');
    const token = await AsyncStorage.getItem(key);
    store.dispatch(AuthCreators.updateToken(token));
    this.setState({ token, authChecked: true });

    // Parse.setAsyncStorage(AsyncStorage);
    // Parse.initialize('123');
    // Parse.serverURL = 'http://192.168.25.8:1337/parse';
    // console.tron.log("Parse initialized");

    // Parse.User.become("r:2706315697d9c1d1c3eaa1f2e135f573");
    // this.saveObject();
    // this.loadObject();
    // this.signup();
    // this.login();
    // await this.saveAuthObject();
    // this.deleteObject();
    // await this.queryObjects();
    // this.checkUser();
  }

  render() {
    if (!this.state.authChecked) return null;

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
