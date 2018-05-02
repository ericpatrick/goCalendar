import { StackNavigator } from 'react-navigation';
import Identify from 'pages/Identify';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Schedule from 'pages/Schedule';

const createNavigator = (isLogged = false) => StackNavigator({
  Identify: { screen: Identify },
  Login: { screen: Login },
  Register: { screen: Register },
  Schedule: { screen: Schedule },
}, {
  initialRouteName: isLogged ? 'Schedule' : 'Identify',
});

export default createNavigator;
