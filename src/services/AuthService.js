import { API_URL }      from "../constants.js";
import { handlerError } from "./HTTPService";

const apiUrl = API_URL + "/auth";

export async function doLogin(email, password) {
    let response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return handlerError(response);
}
