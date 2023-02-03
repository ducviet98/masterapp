import Cryptr from 'cryptr';
const singletonEnforcer = Symbol();
class CookieHandler {
  secretKey: any;
  cryptoHandler: any;
  static cookieHandlerInstance: any;
  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Cookie single instance');
    }
    this.secretKey = navigator.userAgent;
    this.cryptoHandler = new Cryptr(this.secretKey);
  }
  static get instance() {
    if (!this.cookieHandlerInstance) {
      this.cookieHandlerInstance = new CookieHandler(singletonEnforcer);
    }
    return this.cookieHandlerInstance;
  }
  setCookie(name: string, value: any, minutesExpired: number) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesExpired);
    const expires = `expires=${date.toUTCString()}`;
    const encryptedValue = this.cryptoHandler.encrypt(value); // Encrypt original value
    document.cookie = `${name}=${encryptedValue};${expires};path=/`;
  }
  removeCookie(name: string) {
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    } catch (error) {
      console.log(error);
    }
  }
  getCookie(name: string) {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const partsPop = parts.pop();
        if (partsPop)
          return this.cryptoHandler.decrypt(partsPop.split(';').shift()); // Decrypt for get original value
      }
      return '';
    } catch (error) {
      return '';
    }
  }
  checkCookie(name: string) {
    try {
      const user = this.getCookie(name);
      const isValidCookie = this.isValidCookie(user);

      if (user !== '' && user !== null && isValidCookie) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  isValidCookie(cookie: string) {
    try {
      for (let i = 0; i < cookie.length; i++) {
        if (cookie.charCodeAt(i) > 127) {
          return false;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
export default CookieHandler.instance;
