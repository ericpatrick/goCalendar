import Parse from 'parse/react-native';
import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { eventChannel } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';

import Helpers from 'helpers';

import { Creators as EventsCreators } from 'store/ducks/events';

export function* loadEvents() {
  try {
    const { currentDate } = yield select(state => state.events);
    const baseDate = currentDate.hours(0).utc();
    const startDate = baseDate.startOf('day').toDate();
    const endDate = baseDate.endOf('day').toDate();

    const Events = Parse.Object.extend('Events');
    const query = new Parse.Query(Events);
    // query.equalTo("playerName", "Dan Stemkoski");
    query.greaterThanOrEqualTo('dateTime', startDate);
    query.lessThanOrEqualTo('dateTime', endDate);
    // query.ascending('dateTime');
    const resp = yield call([query, query.find]);
    const listEvents = resp.map(event =>({
      id: event.id,
      dateTime: event.get('dateTime'),
      name: event.get('name'),
      place: event.get('place'),
    }));

    yield put(EventsCreators.loadEventsSuccess(listEvents));
  } catch (error) {
    yield put(EventsCreators.loadEventsFail('Falha ao carregar os eventos'));
  }
}

export function* addEvent(action) {
  try {
    const Events = Parse.Object.extend('Events');
    const event = new Events();

    const userObj = Parse.User;
    const user = yield call([userObj, userObj.currentAsync]);
    const { date, name, place } = action.payload.event;
    const dateTime = moment.parseZone(date).toDate();

    event.set('dateTime', dateTime);
    event.set('name', name);
    event.set('place', place);
    event.setACL(new Parse.ACL(user));

    yield call([event, event.save]);

    yield put(EventsCreators.toggleNewEventVisible());
    yield put(EventsCreators.loadEvents());
  } catch (error) {
    yield put(EventsCreators.addEventFail('Erro ao adicionar evento'));
  }
}

export function* changeCurrentDate() {
  yield put(EventsCreators.loadEvents());
}

export function* removeEvent(action) {
  try {
    const { id } = action.payload;

    const Events = Parse.Object.extend('Events');
    const query = new Parse.Query(Events);
    const event = yield call([query, query.get], id);
    yield call([event, event.destroy]);

    yield put(EventsCreators.loadEvents());
  } catch (error) {
    yield put(EventsCreators.removeEventFail('Erro ao remover evento'));
  }
}
