import '../../components/alert-message/alert-message.js';
import '../../components/header-menu/header-menu.js';
import '../../components/button-like/button-like.js';
import '../../components/comment-item/comment-item.js';
import TokenService   from '../../services/TokenService.js';
import CommentService from '../../services/CommentService.js';
import SubjectService from '../../services/SubjectService.js';

const URL_LOGIN = '../login/';
const URL_HOME = '../home/';

document.addEventListener('DOMContentLoaded', initialize);

/**
 * Initialize page.
 * @returns {Promise<void>}
 */
async function initialize() {
    if (TokenService.isLogged() && getCurrentIdSubject()) {
        addHeader();
        await getDetail(getCurrentIdSubject());
        document.getElementById('commentForm').addEventListener('submit', sendComment);
        document.addEventListener('reply', sendReply);
        document.addEventListener('remove', removeComment);
    } else if (!getCurrentIdSubject()) {
        window.location.href = URL_HOME;
    } else {
        window.location.href = URL_LOGIN;
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
 * Add all replies of the comment.
 *
 * @param replies
 * @param idComment
 */
function addReplies(replies, idComment) {
    if (replies.length > 0) {
        replies.forEach(reply => {
            if (!reply.deleted) {
                addReply(reply, idComment);
                addReplies(reply.answers, reply.idComment);
            }
        });
    }
}

/**
 * Add a new reply of the comment.
 * @param reply
 * @param idComment
 */
function addReply(reply, idComment) {
    const $replies = document.querySelector(`span.replies-${idComment}`);
    const $replyItem = document.createElement('comment-item');
    $replyItem.setAttribute('code', reply.idComment);
    $replyItem.setAttribute('message', reply.text);
    $replyItem.setAttribute('date', reply.date);
    $replyItem.setAttribute('author', `${reply.user.firstName} ${reply.user.lastName}`);
    $replyItem.setAttribute('show-remove', reply.userLogInComment);
    $replies.appendChild($replyItem);

    const $repliesReply = document.createElement('span');
    $repliesReply.classList.add(`replies-${reply.idComment}`);
    $replies.appendChild($repliesReply);
}

/**
 * Add all comments of the subject.
 * @param comments
 */
function addComments(comments) {
    const $comments = document.getElementById('show-comments');
    $comments.innerHTML = '';

    comments.forEach(comment => {
        if (!comment.deleted) {
            addComment(comment)
        }
    });
}

/**
 * Add a comment of subject.
 * @param comment
 */
function addComment(comment) {
    const $comments = document.getElementById('show-comments');
    const $commentItem = document.createElement('comment-item');
    $commentItem.setAttribute('code', comment.idComment);
    $commentItem.setAttribute('message', comment.text);
    $commentItem.setAttribute('date', comment.date);
    $commentItem.setAttribute('author', `${comment.user.firstName} ${comment.user.lastName}`);
    $commentItem.setAttribute('show-remove', comment.userLogInComment);
    $comments.appendChild($commentItem);

    const $replies = document.createElement('span');
    $replies.classList.add(`replies-${comment.idComment}`);
    $comments.appendChild($replies);

    addReplies(comment.answers, comment.idComment);
}

/**
 * Send the comment to Service of API.
 * @param event
 * @returns {Promise<void>}
 */
async function sendComment(event) {
    try {
        event.preventDefault();
        const $textComment = document.getElementById('comment-text');
        const commentSave = await CommentService.save(getCurrentIdSubject(), $textComment.value);
        $textComment.value = '';
        addComment(commentSave);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Send the reply of the comment to Service of API.
 * @param event
 * @returns {Promise<void>}
 */
async function sendReply(event) {
    try {
        const reply = await CommentService.reply(event.detail.code, event.detail.message);
        addReply(reply, event.detail.code);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Remove the comment to Service of API.
 * @param event
 * @returns {Promise<void>}
 */
async function removeComment(event) {
    try {
        await CommentService.remove(event.detail.code);
        removeDOMComment(event.target, event.detail.code);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * Remove the web component comment-item and all replies of the comment.
 * @param $dom
 * @param idComment
 */
function removeDOMComment($dom, idComment) {
    const $replies = document.querySelector(`span.replies-${idComment}`);
    $replies.parentElement.removeChild($replies);
    $dom.parentElement.removeChild($dom);
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
    await SubjectService.like(id);
}

/**
 * Return the detail of subject by id.
 * @param id
 * @returns {Promise<void>}
 */
async function getDetail(id) {
    try {
        const subject = await SubjectService.find(id);
        addTitle(id, subject.name);
        addButtonLike(id, subject.userLogInLike, subject.numLikes);
        addComments(subject.comments);
    } catch (e) {
        console.log(e);
    }
}

/**
 * Get the id of subject by url params.
 * @returns {string}
 */
function getCurrentIdSubject() {
    return location.search.substring(4);
}
