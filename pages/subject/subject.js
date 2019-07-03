import '../../components/alert-message/index.js';
import '../../components/header-menu/header-menu.js';
import '../../components/button-like/button-like.js';
import '../../components/comment-item/comment-item.js';
import TokenService   from '../../services/TokenService.js';
import CommentService from '../../services/CommentService.js';
import SubjectService from '../../services/SubjectService.js';

const URL_LOGIN = '../login/';

document.addEventListener('DOMContentLoaded', init);

/**
 * Initialize app.
 * @returns {Promise<void>}
 */
async function init() {
    if(TokenService.isLogged()) {
        addHeader();
        await getDetail(getCurrentIdSubject());
        document.getElementById('commentForm').addEventListener('submit', sendComment);
    } else {
        window.location.href = URL_LOGIN;
    }
}

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

async function sendReply(event) {
    try {
        console.log('respondi....', event.detail.code);
        event.preventDefault();
        const reply = await CommentService.reply(event.detail.code, event.detail.message);
        addReply(reply, event.detail.code);
    } catch (error) {
        console.log(error.message);
    }
}

function addComments(comments) {
    const $comments = document.getElementById('show-comments');
    $comments.innerHTML = '';

    comments.forEach(comment => {
        if(!comment.deleted) {
            addComment(comment)
        }
    });
}

function addReplies(replies, idComment) {
    if (replies.length > 0) {
        replies.forEach(reply => {
            if(!reply.deleted) {
                addReply(reply, idComment);
                addReplies(reply.answers, reply.idComment);
            }
        });
    }
}

async function removeComment(event) {
    try {
        await CommentService.remove(event.detail.code);
        removeDOMComment(event.target, event.detail.code);
    } catch (error) {
        console.log(error.message);
    }
}

function addReply(reply, idComment) {
    const $replies = document.querySelector(`span.replies-${idComment}`);
    const $replyItem = document.createElement('comment-item');
    $replyItem.setAttribute('code', reply.idComment);
    $replyItem.setAttribute('message', reply.text);
    $replyItem.setAttribute('date', reply.date);
    $replyItem.setAttribute('author', `${reply.user.firstName} ${reply.user.lastName}`);
    $replyItem.setAttribute('show-remove', reply.userLogInComment);
    $replyItem.addEventListener('reply', sendReply);
    $replyItem.addEventListener('remove', removeComment);
    $replies.appendChild($replyItem);

    const $repliesReply = document.createElement('span');
    $repliesReply.classList.add(`replies-${reply.idComment}`);
    $replies.appendChild($repliesReply);
}

function removeDOMComment($dom, idComment) {
    const $replies = document.querySelector(`span.replies-${idComment}`);
    $replies.parentElement.removeChild($replies);
    $dom.parentElement.removeChild($dom);
}

function addComment(comment) {
    const $comments = document.getElementById('show-comments');
    const $commentItem = document.createElement('comment-item');
    $commentItem.setAttribute('code', comment.idComment);
    $commentItem.setAttribute('message', comment.text);
    $commentItem.setAttribute('date', comment.date);
    $commentItem.setAttribute('author', `${comment.user.firstName} ${comment.user.lastName}`);
    $commentItem.setAttribute('show-remove', comment.userLogInComment);
    $commentItem.addEventListener('reply', sendReply);
    $commentItem.addEventListener('remove', removeComment);
    $comments.appendChild($commentItem);

    const $replies = document.createElement('span');
    $replies.classList.add(`replies-${comment.idComment}`);
    $comments.appendChild($replies);

    addReplies(comment.answers, comment.idComment);
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

function getCurrentIdSubject() {
    return location.search.substring(4);
}
