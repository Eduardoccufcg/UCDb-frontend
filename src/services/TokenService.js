const KEY = 'authToken';

export default class TokenService {
    /**
     * Return the auth token.
     * @returns {string}
     */
    static getToken() {
        return window.localStorage.getItem(KEY);
    }

    /**
     * Verify if has auth token.
     * @returns {boolean}
     */
    static hasToken() {
        return !!this.getToken();
    }

    /**
     * Set value the auth token.
     * @param token
     */
    static setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    /**
     * Remove the auth token.
     */
    static removeToken() {
        window.localStorage.removeItem(KEY);
    }
}
