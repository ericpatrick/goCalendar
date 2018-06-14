import { AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';
import Parse from 'parse/react-native';
import Helpers from 'helpers';

import { Creators as AuthCreators } from 'store/ducks/auth';

export function* authenticate(action) {
  try {
    const { phone, password } = action.payload;
    const userObj = Parse.User;
    const user = yield call([userObj, userObj.logIn], phone, password);

    const sessionToken = user.get('sessionToken');
    const key = Helpers.getStorageKey('token');
    yield call([AsyncStorage, AsyncStorage.setItem], key, sessionToken);

    yield put(AuthCreators.authenticateSuccess(sessionToken));
  } catch (error) {
    console.tron.log('SAGA: authenticate fail');
    console.tron.log(error);
    yield put(AuthCreators.authenticateFail('Error ao autenticar o usuário'));
  }
}
