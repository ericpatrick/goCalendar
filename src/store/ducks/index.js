import { combineReducers } from 'redux';
import auth from './auth';
import phone from './phone';

export default combineReducers({
  auth,
  phone,
});
