import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import events from './events'
import notification from './notification'

export default combineReducers({
  auth,
  user,
  events,
  notification,
});
