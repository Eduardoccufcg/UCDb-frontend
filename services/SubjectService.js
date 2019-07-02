import { API_URL } from "../constants.js";
import HTTPService from './HTTPService.js';

const apiUrl = API_URL + "/disciplines";

export async function searchSubjects(search) {
    let response = await fetch(`${apiUrl}/search?substring=${search}`, {
        method: 'GET',
        headers: HTTPService.getHeaders()
    });

    return HTTPService.handlerError(response);
}

export async function getSubject(id, idUser) {
    let response = await fetch(`${API_URL}/profiles/${id}/${idUser}`, {
        method: 'GET',
        headers: HTTPService.getHeaders()
    });

    return HTTPService.handlerError(response);
}

export async function toLikeSubject(id, idUser) {
    let response = await fetch(`${API_URL}/profiles/like/${id}/${idUser}`, {
        method: 'POST',
        headers: HTTPService.getHeaders()
    });

    return HTTPService.handlerError(response);
}
