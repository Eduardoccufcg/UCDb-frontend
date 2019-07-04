import { API_URL } from "../constants.js";
import HTTPService from "./HTTPService.js";

const apiUrl = API_URL + "/auth";

class AuthService {
    static async login(email, password) {
        let response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return HTTPService.getResponse(response);
    }
}

export default AuthService;
