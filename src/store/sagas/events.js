import Parse from 'parse/react-native';
import moment from 'moment';
import { call, put, select } from 'redux-saga/effects';

import { Creators as EventsCreators } from 'store/ducks/events';
import { Creators as NotificationCreators } from 'store/ducks/notification';

export function* loadEvents() {
  try {
    const { currentDate } = yield select(state => state.events);
    const baseDate = currentDate.hours(0).utc();
    const startDate = baseDate.startOf('day').toDate();
    const endDate = baseDate.endOf('day').toDate();

    const Events = Parse.Object.extend('Events');
    const query = new Parse.Query(Events);
    query.greaterThanOrEqualTo('dateTime', startDate);
    query.lessThanOrEqualTo('dateTime', endDate);
    query.ascending('dateTime');
    const resp = yield call([query, query.find]);
    const listEvents = resp.map(event =>({
      id: event.id,
      dateTime: event.get('dateTime'),
      name: event.get('name'),
      place: event.get('place'),
    }));

    yield put(EventsCreators.loadEventsSuccess(listEvents));
  } catch (error) {
    const message = 'Falha ao carregar os eventos';
    yield put(NotificationCreators.show({
      message,
      isError: true,
    }));
    yield put(EventsCreators.loadEventsFail(message));
  }
}

export function* addEvent(action) {
  try {
    const Events = Parse.Object.extend('Events');
    const event = new Events();

    const userObj = Parse.User;
    const user = yield call([userObj, userObj.currentAsync]);
    const { date, name, place } = action.payload.event;
    if (date.length > 0 && name.length > 0 && place.length > 0) {
      const dateTime = moment.parseZone(date).toDate();

      event.set('dateTime', dateTime);
      event.set('name', name);
      event.set('place', place);
      event.setACL(new Parse.ACL(user));

      yield call([event, event.save]);

      yield put(EventsCreators.toggleNewEventVisible());
      yield put(EventsCreators.loadEvents());
      yield put(NotificationCreators.show({
        message: 'Evento adicionado com sucesso!',
      }));
    } else {
      const message = 'Para criar um novo evento é necessário preencher todos os campos';
      yield put(NotificationCreators.show({
        message,
        isError: true,
        duration: 4000,
        modalMode: true,
      }));
      yield put(EventsCreators.addEventFail(message));
    }
  } catch (error) {
    const message = 'Erro ao adicionar evento';
    yield put(NotificationCreators.show({
      message,
      isError: true,
      modalMode: true,
    }));
    yield put(EventsCreators.addEventFail(message));
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
    const message = 'Erro ao remover evento';
    yield put(NotificationCreators.show({
      message,
      isError: true,
    }));
    yield put(EventsCreators.removeEventFail(message));
  }
}
