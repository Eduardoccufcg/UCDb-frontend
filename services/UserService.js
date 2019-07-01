import { API_URL }      from "../constants.js";
import { handlerError } from "./HTTPService.js";

const apiUrl = API_URL + "/users";

export async function createUser(user) {
    let response = await fetch(`${apiUrl}/`, {
        method: 'POST',
        body: JSON.stringify(user.objectToRest()),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return handlerError(response);
}
