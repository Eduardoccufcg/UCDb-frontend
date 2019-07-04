import { API_URL } from "../constants.js";
import HTTPService from './HTTPService.js';

const apiUrl = API_URL + "/comments";

class CommentService {

    /**
     * Save the comment of subject.
     * @param idSubject
     * @param text
     * @returns {Promise<*>}
     */
    static async save(idSubject, text) {
        let response = await fetch(`${apiUrl}/${idSubject}`, {
            method: 'POST',
            headers: HTTPService.getHeaders(),
            body: JSON.stringify({ text }),
        });

        return HTTPService.getResponse(response);
    }

    /**
     * Reply the comment of subject.
     *
     * @param idComment
     * @param text
     * @returns {Promise<*>}
     */
    static async reply(idComment, text) {
        let response = await fetch(`${apiUrl}/reply/${idComment}`, {
            method: 'POST',
            headers: HTTPService.getHeaders(),
            body: JSON.stringify({ text }),
        });

        return HTTPService.getResponse(response);
    }

    /**
     * Remove the comment by id.
     *
     * @param idComment
     * @returns {Promise<*>}
     */
    static async remove(idComment) {
        let response = await fetch(`${apiUrl}/${idComment}`, {
            method: 'DELETE',
            headers: HTTPService.getHeaders(),
        });

        return HTTPService.getResponse(response);
    }
}

export default CommentService;
