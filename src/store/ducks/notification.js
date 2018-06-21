export const Types = {
  SHOW: 'notification/SHOW',
  CLEAR: 'NOTIFICATION/CLEAR',
};

const INITIAL_STATE = {
  isError: false,
  message: '',
  duration: 0,
  modalMode: false,
};

export default function notification(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      return {
        message: action.payload.params.message,
        isError: action.payload.params.isError,
        duration: action.payload.params.duration || 3000,
        modalMode: (action.payload.params.modalMode === true),
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
      params,
    },
  }),

  clear: () => ({
    type: Types.CLEAR,
  }),
};
