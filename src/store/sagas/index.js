import { all, takeLatest } from 'redux-saga/effects';

import { Types as UserTypes } from 'store/ducks/user';
import { Types as AuthTypes } from 'store/ducks/auth';
import { Types as EventsTypes } from 'store/ducks/events';

import { checkPhone, createUser } from './user';
import { authenticate } from './auth';
import { addEvent, loadEvents, changeCurrentDate, removeEvent } from './events';

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.CHECK_PHONE, checkPhone),
    takeLatest(UserTypes.CREATE_USER, createUser),
    takeLatest(AuthTypes.AUTHENTICATE, authenticate),
    takeLatest(EventsTypes.ADD_EVENT, addEvent),
    takeLatest(EventsTypes.LOAD_EVENTS, loadEvents),
    takeLatest(EventsTypes.CHANGE_CURRENT_DATE, changeCurrentDate),
    takeLatest(EventsTypes.REMOVE_EVENT, removeEvent),
  ]);
}
