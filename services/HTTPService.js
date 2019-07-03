import TokenService from './TokenService.js';

class HTTPService {
    static getHeaders() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (TokenService.hasToken()) {
            headers[ 'Authorization' ] = `Bearer ${TokenService.getToken()}`;
        }
    }

    static async getResponse(response) {
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return response.json();
    }
}

export default HTTPService;
