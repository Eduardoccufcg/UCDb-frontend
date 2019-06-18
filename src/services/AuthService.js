import { API_URL } from "../constants.js";

const apiUrl = API_URL + "/auth";

async function handlerError(response) {
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    return response.json();
}

export async function doLogin(email, password) {
    let response = await fetch(apiUrl + "/login", {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return handlerError(response);
}
