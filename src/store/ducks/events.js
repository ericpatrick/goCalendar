import moment from 'moment';

export const Types = {
  LOAD_EVENTS: 'events/LOAD_EVENTS',
  LOAD_EVENTS_SUCCESS: 'events/LOAD_EVENTS_SUCCESS',
  LOAD_EVENTS_FAIL: 'events/LOAD_EVENTS_FAIL',
  TOGGLE_NEW_EVENT_VISIBLE: 'events/TOGGLE_NEW_EVENT_VISIBLE',
  ADD_EVENT: 'events/ADD_EVENT',
  ADD_EVENT_FAIL: 'events/ADD_EVENT_FAIL',
  CHANGE_CURRENT_DATE: 'events/CHANGE_CURRENT_DATE',
  REMOVE_EVENT: 'events/REMOVE_EVENT',
  REMOVE_EVENT_FAIL: 'events/REMOVE_EVENT_FAIL',
};

const INITIAL_STATE = {
  currentEvents: [],
  currentDate: moment(),
  newEventVisible: false,
  loading: false,
  error: '',
};

export default function events(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        currentEvents: action.payload.listEvent,
        loading: false,
        error: '',
      };
    case Types.TOGGLE_NEW_EVENT_VISIBLE:
      return {
        ...state,
        newEventVisible: !state.newEventVisible,
      };
    case Types.LOAD_EVENTS:
    case Types.ADD_EVENT:
    case Types.REMOVE_EVENT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case Types.LOAD_EVENTS_FAIL:
    case Types.ADD_EVENT_FAIL:
    case Types.REMOVE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case Types.CHANGE_CURRENT_DATE:
      return {
        ...state,
        currentDate: moment(action.payload.date),
      };
    default:
      return state;
  }
}

export const Creators = {
  loadEvents: () => ({
    type: Types.LOAD_EVENTS,
  }),

  loadEventsSuccess: listEvent => ({
    type: Types.LOAD_EVENTS_SUCCESS,
    payload: {
      listEvent,
    },
  }),

  loadEventsFail: error => ({
    type: Types.LOAD_EVENTS_FAIL,
    payload: {
      error,
    },
  }),

  toggleNewEventVisible: () => ({
    type: Types.TOGGLE_NEW_EVENT_VISIBLE,
  }),

  addEvent: event => ({
    type: Types.ADD_EVENT,
    payload: {
      event,
    },
  }),

  addEventFail: error => ({
    type: Types.ADD_EVENT_FAIL,
    payload: {
      error,
    },
  }),

  changeCurrentDate: (date) => ({
    type: Types.CHANGE_CURRENT_DATE,
    payload: {
      date,
    },
  }),

  removeEvent: id => ({
    type: Types.REMOVE_EVENT,
    payload: {
      id,
    },
  }),

  removeEventFail: error => ({
    type: Types.REMOVE_EVENT_FAIL,
    payload: {
      error,
    },
  }),
};
