import { API_URL }    from "../constants.js";
import HTTPService    from './HTTPService.js';

const apiUrl = API_URL + "/profiles";

class SubjectService {

    static async search(keyword) {
        let response = await fetch(`${apiUrl}/search?substring=${keyword}`, {
            method: 'GET',
            headers: HTTPService.getHeaders()
        });

        return HTTPService.getResponse(response);
    }

    static async find(id) {
        let response = await fetch(`${apiUrl}/${id}`, {
            method: 'GET',
            headers: HTTPService.getHeaders()
        });

        return HTTPService.getResponse(response);
    }

    static async like(id) {
        let response = await fetch(`${apiUrl}/like/${id}`, {
            method: 'POST',
            headers: HTTPService.getHeaders()
        });

        return HTTPService.getResponse(response);
    }

    static async ranking() {
        let response = await fetch(`${apiUrl}/ranking/`, {
            method: 'GET',
            headers: HTTPService.getHeaders()
        });

        return HTTPService.getResponse(response);
    }
}

export default SubjectService;
