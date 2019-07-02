import '../../components/alert-message/index.js';
import '../../components/header-menu/index.js';
import '../../components/button-like/index.js';
import TokenService                   from '../../services/TokenService.js';
import { getSubject, toLikeSubject } from '../../services/SubjectService.js';

async function init() {
    const id = location.search.substring(4);
    await getDetail(id);
    addHeader();
}

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
    $like.innerHTML = '';

    const $buttonLike = document.createElement('button-like');
    $buttonLike.setAttribute('liked', liked);
    $buttonLike.setAttribute('counter', counter);
    $buttonLike.addEventListener('like', () => likeSubject(id));
    $like.appendChild($buttonLike);
}

function addTitle(id, title) {
    const $title = document.querySelector('.subject-title');
    $title.innerHTML = `<small>Código: ${id}</small>${title}`;
}

async function likeSubject(id) {
    const subject = await toLikeSubject(id, TokenService.getUserLoggedId());
    addButtonLike(id, subject.userLogInLike, subject.numLikes);
}

async function getDetail(id) {
    try {
        const subject = await getSubject(id, TokenService.getUserLoggedId());
        addTitle(id, subject.discipline.name);
        addButtonLike(id, subject.userLogInLike, subject.numLikes);
        console.log(subject);
    } catch (e) {
        console.log(e);
    }
}

init();
