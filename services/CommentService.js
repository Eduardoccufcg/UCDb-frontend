import { API_URL } from "../constants.js";
import HTTPService from './HTTPService.js';

const apiUrl = API_URL + "/profiles/comment";

class CommentService {

    /**
     * Save the comment of subject.
     * @param idSubject
     * @param comment
     * @returns {Promise<*>}
     */
    static async save(idSubject, comment) {
        let response = await fetch(`${apiUrl}/${idSubject}`, {
            method: 'POST',
            headers: HTTPService.getHeaders(),
            body: JSON.stringify(CommentService.commentToJSON(comment)),
        });

        return HTTPService.getResponse(response);
    }

    /**
     * Return the object comment to JSON.
     * @param comment
     * @returns {{id: *, text: (*|string|(() => Promise<string>)|SVGTextElement|(() => string))}}
     */
    static commentToJSON(comment) {
        return {
            id: comment.id,
            text: comment.text
        }
    }
}

export default CommentService;
