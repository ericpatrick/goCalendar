export default class Helpers {
  static appName = 'goCalendar';
  static parseAppId = '123';

  static getStorageKey(key) {
    return `@${Helpers.appName}:${key}`;
  }

  static getParseKey(key) {
    return `Parse/${Helpers.parseAppId}/${key}`;
  }
}
