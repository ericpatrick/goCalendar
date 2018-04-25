export const Types = {
  AUTHENTICATE: 'auth/AUTHENTICATE',
  AUTHENTICATE_SUCCESS: 'auth/AUTHENTICATE_SUCCESS',
  AUTHENTICATE_FAIL: 'auth/AUTHENTICATE_FAIL',
};

const INITIAL_STATE = {
  token: '',
  loading: false,
  error: '',
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.AUTHENTICATE:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case Types.AUTHENTICATE_SUCCESS:
      return {
        token: action.payload.token,
        loading: false,
        error: '',
      };
    case Types.AUTHENTICATE_FAIL:
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
  authenticate: (phone, password) => ({
    type: Types.AUTHENTICATE,
    payload: {
      phone,
      password,
    }
  }),

  authenticateSuccess: token => ({
    type: Types.AUTHENTICATE_SUCCESS,
    payload: {
      token,
    }
  }),

  authenticateFail: error => ({
    type: Types.AUTHENTICATE_FAIL,
    payload: {
      error,
    }
  }),
};
