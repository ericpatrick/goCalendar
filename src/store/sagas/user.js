import { call, put } from 'redux-saga/effects';
import { Creators as UserCreators } from 'store/ducks/user';
import { Creators as AuthCreators } from 'store/ducks/auth';
import api from 'services/api';

export function* checkPhone(action) {
  try {
    const { status } = yield call(api.get, `/phone/${action.payload.phone}`);
    yield put(UserCreators.checkPhoneSucess(action.payload.phone, status === 200));
  } catch (err) {
    yield put(UserCreators.checkPhoneFail('Error ao buscar telefone'));
  }
}

export function* createUser(action) {
  try {
    const { params } = action.payload;
    const { data } = yield call(api.post, '/user', params);

    yield put(AuthCreators.authenticate(data.phone, params.password));
    yield put(UserCreators.createUserSuccess(data));
  } catch (error) {
    yield put(UserCreators.createUserFail('Falha ao criar usuário'));
  }
}
