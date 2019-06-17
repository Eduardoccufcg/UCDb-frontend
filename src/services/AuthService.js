import { API_URL } from "../constants.js";

const apiUrl = API_URL + "/auth";

export async function doLogin(email, password) {
    let response = await fetch(apiUrl + "/login", {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();
    console.log(data);
}
