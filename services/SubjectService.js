import { API_URL } from "../constants.js";
import HTTPService from './HTTPService.js';

const apiUrl = API_URL + "/disciplines";

export async function searchSubjects(search) {
    let response = await fetch(`${apiUrl}/search?substring=${search}`, {
        method: 'GET',
        headers: HTTPService.getHeaders()
    });

    return HTTPService.getResponse(response);
}

export async function getSubject(id) {
    let response = await fetch(`${API_URL}/profiles/${id}`, {
        method: 'GET',
        headers: HTTPService.getHeaders()
    });

    return HTTPService.getResponse(response);
}

export async function toLikeSubject(id) {
    let response = await fetch(`${API_URL}/profiles/like/${id}`, {
        method: 'POST',
        headers: HTTPService.getHeaders()
    });

    return HTTPService.getResponse(response);
}
