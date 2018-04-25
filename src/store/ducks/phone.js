import { PhoneStatus } from 'store/models';

export const Types = {
  CHECK_PHONE: 'auth/CHECK_PHONE',
  CHECK_PHONE_SUCCESS: 'auth/CHECK_PHONE_SUCCESS',
  CHECK_PHONE_FAIL: 'auth/CHECK_PHONE_FAIL',
};

const INITIAL_STATE = {
  phoneNumber: '',
  phoneStatus: PhoneStatus.NOT_CHECKED,
  loading: false,
  error: '',
};

export default function auth(state = INITIAL_STATE, action) {
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
    default:
      return state;
  }
}

export const Creators = {
  checkPhone: (phone) => ({
    type: Types.CHECK_PHONE,
    payload: {
      phone,
    }
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
};
