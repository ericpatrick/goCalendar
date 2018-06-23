export default class Helpers {
  static appName = 'goCalendar';
  static parseAppId = 'Do2t8bgBNY';

  static getStorageKey(key) {
    return `@${Helpers.appName}:${key}`;
  }

  static getParseKey(key) {
    return `Parse/${Helpers.parseAppId}/${key}`;
  }
}
