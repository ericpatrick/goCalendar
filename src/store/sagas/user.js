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
    const message = 'Error ao buscar telefone';
    yield put(NotificationCreators.show({
      message,
      isError: true,
    }));
    yield put(UserCreators.checkPhoneFail(message));
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
    const message = 'Falha ao criar usuário';
    yield put(NotificationCreators.show({
      message,
      isError: true,
    }));
    yield put(UserCreators.createUserFail(message));
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
    const message = 'Erro ao carregar dados do usuário!';
    yield put(NotificationCreators.show({
      message,
      isError: true,
    }));
    yield put(UserCreators.loadUserFail(message));
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
    const message = 'Erro ao atualizar o usuário';
    yield put(NotificationCreators.show({
      message,
      isError: true,
    }));
    yield put(UserCreators.saveUserFail(message));
  }
}
