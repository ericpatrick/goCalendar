export const Types = {
  SHOW: 'notification/SHOW',
  CLEAR: 'NOTIFICATION/CLEAR'
};

const INITIAL_STATE = {
  isError: false,
  message: '',
  duration: 0,
};

export default function notification(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      const { message, isError, duration } = action.payload.params;
      return {
        message,
        isError,
        duration: duration || 2000,
      };
    case Types.CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const Creators = {
  show: params => ({
    type: Types.SHOW,
    payload: {
      params
    },
  }),

  clear: () => ({
    type: Types.CLEAR,
  }),
};
