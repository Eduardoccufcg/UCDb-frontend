import '../../components/alert-message/index.js';
import '../../components/header-menu/header-menu.js';
import '../../components/button-like/button-like.js';
import TokenService                  from '../../services/TokenService.js';
import CommentService                from '../../services/CommentService.js';
import { getSubject, toLikeSubject } from '../../services/SubjectService.js';
import Comment                       from "../../models/Comment.js";

/**
 * Initialize app.
 * @returns {Promise<void>}
 */
async function init() {
    addHeader();
    await getDetail(getCurrentIdSubject());
    document.getElementById('commentForm').addEventListener('submit', sendComment);
}

async function sendComment(event) {
    try {
        event.preventDefault();
        const $textComment = document.getElementById('comment-text');
        const comment = new Comment(0, $textComment.value);
        const commentSave = await CommentService.save(getCurrentIdSubject(), comment);
        $textComment.value = '';
        console.log(commentSave);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Add the web component header in the page.
 */
function addHeader() {
    const $header = document.getElementById('main-header');
    const $headerElement = document.createElement('header-menu');
    $headerElement.setAttribute('username', TokenService.getUserFirstName());
    $headerElement.setAttribute('logged', TokenService.isLogged().toString());
    $headerElement.addEventListener('logout', TokenService.logout);
    $header.appendChild($headerElement);
}

/**
 * Add the button like in the page.
 *
 * @param liked
 * @param counter
 */
function addButtonLike(id, liked, counter) {
    const $like = document.querySelector('.button-like');
    const $buttonLike = document.createElement('button-like');
    $buttonLike.setAttribute('liked', liked);
    $buttonLike.setAttribute('counter', counter);
    $buttonLike.addEventListener('like', () => likeSubject(id));
    $like.appendChild($buttonLike);
}

/**
 * Show title and id in the view.
 * @param id
 * @param title
 */
function addTitle(id, title) {
    const $title = document.querySelector('.subject-title');
    $title.innerHTML = `<small>Código: ${id}</small>${title}`;
}

/**
 * To like in the subject.
 * @param id
 * @returns {Promise<void>}
 */
async function likeSubject(id) {
    await toLikeSubject(id, TokenService.getUserLoggedId());
}

/**
 * Return the detail of subject by id.
 * @param id
 * @returns {Promise<void>}
 */
async function getDetail(id) {
    try {
        const subject = await getSubject(id, TokenService.getUserLoggedId());
        addTitle(id, subject.discipline.name);
        addButtonLike(id, subject.userLogInLike, subject.numLikes);
    } catch (e) {
        console.log(e);
    }
}

function getCurrentIdSubject() {
    return location.search.substring(4);
}

init();
