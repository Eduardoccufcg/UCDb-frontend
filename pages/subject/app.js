import '../../components/subject-item/index.js';
import '../../components/alert-message/index.js';
import '../../components/header-menu/index.js';
import TokenService                   from '../../services/TokenService.js';
import { getSubject } from '../../services/SubjectService.js';

function init() {
    const id = location.search.substring(4);
    const $header = document.getElementById('main-header');
    const $headerElement = document.createElement('header-menu');
    $headerElement.setAttribute('username', TokenService.getUserLoggedId());
    $headerElement.setAttribute('logged', TokenService.isLogged().toString());
    $headerElement.addEventListener('logout', TokenService.logout);
    $header.appendChild($headerElement);
}

init();
