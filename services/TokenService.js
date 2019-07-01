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
     * Return the payload by token JWT.
     * @returns {any}
     */
    static getPayload() {
        if(this.hasToken()) {
            const token = this.getToken();
            const base64Url = token.split('.')[ 1 ];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(component => '%' +
                ('00' + component.charCodeAt(0).toString(16)).slice(-2)).join(''));

            return JSON.parse(jsonPayload);
        }
    }

    /**
     * Return the id (email) by logged user.
     * @returns string
     */
    static getUserLoggedId() {
        if(this.isLogged()) {
            return this.getPayload().sub;
        }
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

    /**
     * Verify if user is logged.
     *
     * @returns {boolean}
     */
    static isLogged() {
        return this.hasToken();
    }

    static logout() {
        window.localStorage.removeItem('authToken');
        window.location.reload();
    }

}
