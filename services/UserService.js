import { API_URL } from "../constants.js";
import HTTPService from "./HTTPService.js";

const apiUrl = API_URL + "/users";

class UserService {
    static async createUser(user) {
        let response = await fetch(`${apiUrl}/`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: HTTPService.getHeaders()
        });

        return HTTPService.getResponse(response);
    }
}

export default UserService;
