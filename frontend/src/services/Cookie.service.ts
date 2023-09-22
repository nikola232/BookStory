export const ACCESS_TOKEN = 'access';
export const USER_DATA = 'user_data';

export const getCookie = (cookie: string) => {
  const ca: Array<string> = document.cookie.split(';');
  const caLen: number = ca.length;
  const cookieName = cookie + '=';
  let c: string;

  for (let i = 0; i < caLen; i += 1) {
    c = ca[i].replace(/^\s+/g, '');
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }

  return '';
}

export const deleteCookie = (cookie: string) => {
  document.cookie = `${cookie}=; expires=${new Date(0).toUTCString()}; path=/;`;
}

export const setCookie = (cookie: string, value: string, expireDays: number, path = '') => {
  const d: Date = new Date();
  d.setTime(d.getTime() + expireDays);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cookie}=${value}; ${expires}${path.length > 0 ? `; path=${path}` : ''}`;
}

export const setUserData = (name: string, value: any) => {
  document.cookie = `${name}={email:${value.email}, firstName:${value.firstName}, lastName:${value.lastName}};`;
}

export const getToken = (name: string) => {
  const cookie = getCookie(name)
  if(cookie) {
    return decodeCookie(cookie);
  }
  return false;
}

export const setToken = (name: string, value: any) => {
  setCookie(name, encodeCookie(value.token), value.expiresIn)
}

export const encodeCookie = (value: any) => {
  return btoa(JSON.stringify(value));
}

export const decodeCookie = (value: any) => {
  return JSON.parse(atob(value));
}
