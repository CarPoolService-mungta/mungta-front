const localStorageHandler = {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setItem(key, val) {
    return localStorage.setItem(key, JSON.stringify(val));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
};
export default localStorageHandler;
