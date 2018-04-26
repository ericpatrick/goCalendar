import { all, takeLatest } from 'redux-saga/effects';

import { Types as UserTypes } from 'store/ducks/user';
import { Types as AuthTypes } from 'store/ducks/auth';

import { checkPhone, createUser } from './user';
import { authenticate } from './auth';

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.CHECK_PHONE, checkPhone),
    takeLatest(UserTypes.CREATE_USER, createUser),
    takeLatest(AuthTypes.AUTHENTICATE, authenticate),
  ]);
}
