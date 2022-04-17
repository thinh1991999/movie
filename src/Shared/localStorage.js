class LocalStorageKey {
  LANGUAGE_THEME = "LANGUAGE_THEME";
  MODE_THEME = "MODE_THEME";
  USER_INFO = "USER_INFO";
}
class BaseStorage {
  key;
  constructor(_key) {
    this.key = _key;
  }
  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  get() {
    const value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : null;
  }
  remove = () => {
    localStorage.removeItem(this.key);
  };
}

class LocalStorageService extends LocalStorageKey {
  constructor() {
    super();
  }

  clearLocalStorage = () => {
    localStorage.clear();
  };
  /**
   * access token storage
   */

  languageTheme = new BaseStorage(this.LANGUAGE_THEME);

  modeTheme = new BaseStorage(this.MODE_THEME);
  userInfo = new BaseStorage(this.USER_INFO);
}

const localStorageServ = new LocalStorageService();

export default localStorageServ;
