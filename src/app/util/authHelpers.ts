const TOKEN_KEY = 'authToken';

export function getJwt () {
	return localStorage.getItem(TOKEN_KEY);
}

export function setJwt (newJwt: string) {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.setItem(TOKEN_KEY, newJwt);
}
