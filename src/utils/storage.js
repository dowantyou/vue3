// src/utils/storage.js
/**
 * window.localStorage => 浏览器永久存储，用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
 */
export const localStorage = {
   /**
   * @param {string} key - 键名
   * @param {*} val - 值，将被转换为 JSON 字符串存储
   * @return {*} 存储的值，将从 JSON 字符串转换回原始类型
   */
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  get(key) {
    const json = window.localStorage.getItem(key);
    return JSON.parse(json);
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  },
};

/**
 * window.sessionStorage => 浏览器本地存储，数据保存在当前会话中，在关闭窗口或标签页之后将会删除这些数据。
 */
export const sessionStorage = {
   /**
   * @param {string} key - 键名
   * @param {*} val - 值，将被转换为 JSON 字符串存储
   * @return {*} 存储的值，将从 JSON 字符串转换回原始类型
   */
  set(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  get(key) {
    const json = window.sessionStorage.getItem(key);
    return JSON.parse(json);
  },
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear();
  },
};

/**
 * 操作 Cookie 
 */
export const cookie = {
  /**
   * 设置 Cookie
   * @param {string} key - 键名
   * @param {string} value - 值
   * @param {number} [days=7] - 过期天数，默认为 7 天
   * @return {string|null} 存储的 Cookie 值或 null（如果找不到）
   */
  set(key, value, days = 7) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = key + '=' + encodeURIComponent(value) + expires + '; path=/';
  },
  get(key) {
    let name = key + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.startsWith(name)) {
        return decodeURIComponent(c.substring(name.length, c.length));
      }
    }
    return null;
  },
  remove(key) {
    document.cookie = key + '=; max-age=-1';
  },
};