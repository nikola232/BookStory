export const ACCESS_TOKEN = 'access_access';
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

export const setCookie = (cookie: string, value: string, expiresIn: number, path = '') => {
  const date: Date = new Date();
  date.setTime(date.getTime() + expiresIn * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cookie}=${value}; ${expires}; path=/`;
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

export const setToken = (name: string, value: object) => {
  const { expiresIn, token }: any = value;
  setCookie(name, encodeCookie(token), expiresIn)
}

export const encodeCookie = (value: any) => {
  return btoa(JSON.stringify(value));
}

export const decodeCookie = (value: any) => {
  return JSON.parse(atob(value));
}
