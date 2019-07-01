import { API_URL }      from "../constants.js";
import { handlerError } from "./HTTPService.js";

const apiUrl = API_URL + "/disciplines";

export async function searchSubjects(search) {
    let response = await fetch(`${apiUrl}/search?substring=${search}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return handlerError(response);
}
