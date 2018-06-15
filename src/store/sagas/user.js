import Parse from 'parse/react-native';
import { call, put } from 'redux-saga/effects';
import { Creators as UserCreators } from 'store/ducks/user';
import { Creators as AuthCreators } from 'store/ducks/auth';
import { Creators as NotificationCreators } from 'store/ducks/notification';
import Helpers from 'helpers';
import { AsyncStorage } from 'react-native';

export function* checkPhone(action) {
  try {
    const { phone } = action.payload;
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', phone);
    const users = yield call([query, query.find]);
    const isRegistred = users.length > 0;
    yield put(UserCreators.checkPhoneSucess(phone, isRegistred));
  } catch (err) {
    console.tron.log('SAGA: checkPhone fail');
    console.tron.log(JSON.stringify(err));
    yield put(UserCreators.checkPhoneFail('Error ao buscar telefone'));
  }
}

export function* createUser(action) {
  try {
    const { params } = action.payload;

    const user = new Parse.User();
    const resp = yield call([user, user.signUp], params);
    const userSaved = {
      username: resp.get('username'),
      fullname: resp.get('fullname'),
      id: resp.get('objectId'),
      sessionToken: resp.get('sessionToken'),
    };

    const { sessionToken } = userSaved;
    const key = Helpers.getStorageKey('token');
    yield call([AsyncStorage, AsyncStorage.setItem], key, sessionToken);

    yield put(UserCreators.createUserSuccess(userSaved));
    yield put(AuthCreators.authenticateSuccess(sessionToken));
  } catch (error) {
    yield put(UserCreators.createUserFail('Falha ao criar usuário'));
  }
}

export function* loadUser() {
  try {
    const userObj = Parse.User;
    const resp = yield call([userObj, userObj.currentAsync]);
    const user = {
      fullName: resp.get('fullName'),
    };

    yield put(UserCreators.loadUserSuccess(user));
  } catch (error) {
    yield put(UserCreators.loadUserFail('Erro ao obetr usuário!'));
  }

}

export function* saveUser(action) {
  try {
    const userObj = Parse.User;
    let user = yield call([userObj, userObj.currentAsync]);

    const { fullName, password} = action.payload.params;
    user.set('fullName', fullName);
    if (password) {
      user.set('password', password);
    }

    user = yield call([user, user.save]);
    const userUpdated = {
      fullName: user.get('fullName'),
    };

    yield put(NotificationCreators.show({
      message: 'User updated',
    }));
    yield put(UserCreators.saveUserSuccess(userUpdated));
  } catch (error) {
    yield put(UserCreators.saveUserFail('Erro ao salvar usuário'));
  }
}
