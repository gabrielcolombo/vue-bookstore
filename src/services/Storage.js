class Storage {
  static set(key, value) {
    localStorage.setItem(key, value);
  }

  static get(key) {
    return localStorage.getItem(key);
  }

  static remove(item) {
    localStorage.removeItem(item);
  }
}

export default Storage;
