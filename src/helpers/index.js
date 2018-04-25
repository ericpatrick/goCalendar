export default class Helpers {
  static appName = 'goCalendar';

  static getStorageKey(key) {
    return `@${Helpers.appName}:${key}`;
  }
}
