import { PhoneStatus } from 'store/models';

export const Types = {
  CHECK_PHONE: 'user/CHECK_PHONE',
  CHECK_PHONE_SUCCESS: 'user/CHECK_PHONE_SUCCESS',
  CHECK_PHONE_FAIL: 'user/CHECK_PHONE_FAIL',
  CREATE_USER: 'user/CREATE_USER',
  CREATE_USER_SUCCESS: 'user/CREATE_USER_SUCCESS',
  CREATE_USER_FAIL: 'user/CREATE_USER_FAIL',
};

const INITIAL_STATE = {
  phoneNumber: '',
  phoneStatus: PhoneStatus.NOT_CHECKED,
  loading: false,
  error: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHECK_PHONE:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case Types.CHECK_PHONE_SUCCESS:
      return {
        phoneNumber: action.payload.phoneNumber,
        phoneStatus: action.payload.isRegistered
          ? PhoneStatus.REGISTERED
          : PhoneStatus.UNREGISTERED,
        loading: false,
        error: '',
      };
    case Types.CHECK_PHONE_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case Types.CREATE_USER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case Types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case Types.CREATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export const Creators = {
  checkPhone: phone => ({
    type: Types.CHECK_PHONE,
    payload: {
      phone,
    },
  }),

  checkPhoneSucess: (phoneNumber, isRegistered) => ({
    type: Types.CHECK_PHONE_SUCCESS,
    payload: {
      phoneNumber,
      isRegistered,
    },
  }),

  checkPhoneFail: error => ({
    type: Types.CHECK_PHONE_FAIL,
    payload: {
      error,
    },
  }),

  createUser: params => ({
    type: Types.CREATE_USER,
    payload: {
      params,
    },
  }),

  createUserSuccess: userCreated => ({
    type: Types.CREATE_USER_SUCCESS,
    payload: {
      userCreated,
    },
  }),

  createUserFail: error => ({
    type: Types.CREATE_USER_FAIL,
    payload: {
      error,
    },
  }),
};
