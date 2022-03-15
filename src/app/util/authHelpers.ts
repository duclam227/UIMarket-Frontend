const TOKEN_KEY = 'authToken';

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}
