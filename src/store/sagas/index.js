import { all, takeLatest } from 'redux-saga/effects';

import { Types as PhoneTypes } from 'store/ducks/phone';
import { Types as AuthTypes } from 'store/ducks/auth';

import { checkPhone } from './phone';
import { authenticate } from './auth';

export default function* rootSaga() {
  return yield all([
    takeLatest(PhoneTypes.CHECK_PHONE, checkPhone),
    takeLatest(AuthTypes.AUTHENTICATE, authenticate),
  ]);
}
