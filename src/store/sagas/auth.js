import { AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';
import api from 'services/api';
import Helpers from 'helpers';

import { Creators as AuthCreators } from 'store/ducks/auth';

export function* authenticate(action) {
  try {
    const params = {
      user: action.payload.phone,
      password: action.payload.password,
    };
    const { data } = yield call(api.post, '/authenticate', params);
    console.tron.log(data);

    const key = Helpers.getStorageKey('token');
    yield call(AsyncStorage.setItem, key, data.token);

    yield put(AuthCreators.authenticateSuccess(data.token));
  } catch (error) {
    yield put(AuthCreators.authenticateFail('Error ao autenticar o usuário'));
  }
}
