const tokenKey = 'authToken';

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
