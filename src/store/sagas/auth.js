import { AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';
import Parse from 'parse/react-native';
import Helpers from 'helpers';

import { Creators as AuthCreators } from 'store/ducks/auth';
import { Creators as NotificationCreators } from 'store/ducks/notification';

function* getToken() {
  const key = Helpers.getParseKey('currentUser');
  const value = yield call([AsyncStorage, AsyncStorage.getItem], key);
  const user = value ? JSON.parse(value) : null;

  return (user && user.sessionToken) || '';
}

export function* authenticate(action) {
  try {
    const { phone, password } = action.payload;
    const userObj = Parse.User;
    const user = yield call([userObj, userObj.logIn], phone, password);

    const sessionToken = user.get('sessionToken');

    yield put(AuthCreators.authenticateSuccess(sessionToken));
  } catch (error) {
    const message = 'Error ao autenticar o usuário';
    yield put(NotificationCreators.show({
      message,
      isError: true,
    }));
    yield put(AuthCreators.authenticateFail(message));
  }
}

export function* checkAuth() {
  try {
    const token = yield getToken();

    yield put(AuthCreators.updateToken(token));
  } catch (error) {
    yield put(NotificationCreators.show({
      message: 'Erro ao validar usuário',
      isError: true,
    }));
  }
}

export function* logout() {
  try {
    const userObj = Parse.User;
    yield call([userObj, userObj.logOut]);
    const token = yield getToken();

    yield put(AuthCreators.updateToken(token));
  } catch (error) {
    yield put(NotificationCreators.show({
      message: 'Erro ao sair da aplicação',
      isError: true,
    }));
  }
}
