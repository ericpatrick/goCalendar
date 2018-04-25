import { StackNavigator } from 'react-navigation';
import Identify from 'pages/Identify';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Calendar from 'pages/Calendar';

const Routes = StackNavigator({
  Identify: { screen: Identify },
  Login: { screen: Login },
  Register: { screen: Register },
  Calendar: { screen: Calendar },
}, {
  initialRouteName: 'Identify',
});

export default Routes;
