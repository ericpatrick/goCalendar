import { call, put } from 'redux-saga/effects';
import { Creators as PhoneCreators } from 'store/ducks/phone';
import api from 'services/api';

export function* checkPhone(action) {
  try {
    const { status } = yield call(api.get, `/phone/${action.payload.phone}`);
    yield put(PhoneCreators.checkPhoneSucess(action.payload.phone, status === 200));
  } catch (err) {
    yield put(PhoneCreators.checkPhoneFail('Error ao buscar telefone'));
  }
}
