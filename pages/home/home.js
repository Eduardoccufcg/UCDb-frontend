import '../../components/subject-item/index.js';
import '../../components/alert-message/index.js';
import '../../components/header-menu/header-menu.js';
import TokenService   from '../../services/TokenService.js';
import SubjectService from '../../services/SubjectService.js';

function init() {
    const $searchBar = document.querySelector('#searchSubject input');
    $searchBar.addEventListener('keyup', search);
    $searchBar.addEventListener('focus', event => event.target.parentElement.classList.add('hover'));
    $searchBar.addEventListener('blur', event => {
        if (event.target.value === '') {
            event.target.parentElement.classList.remove('hover');
        }
    });
    addHeader();
}

function addHeader() {
    const $header = document.getElementById('main-header');
    const $headerElement = document.createElement('header-menu');
    $headerElement.setAttribute('username', TokenService.getUserLoggedId());
    $headerElement.setAttribute('logged', TokenService.isLogged().toString());
    $headerElement.addEventListener('logout', TokenService.logout);
    $header.appendChild($headerElement);
}

async function search(event) {
    const $search = document.querySelector('#searchSubject input');
    const $result = document.getElementById('result');

    if (event.which === 13 || $search.value.length >= 3) {
        try {
            $result.innerHTML = '';
            $search.parentElement.classList.add('hover');

            const subjects = await SubjectService.search($search.value);
            if (subjects.length > 0) {
                subjects.forEach(subject => {
                    let $subject = document.createElement('subject-item');
                    $subject.setAttribute('id', subject.id);
                    $subject.setAttribute('name', subject.name);
                    $subject.setAttribute('show-detail', TokenService.isLogged().toString());
                    $subject.addEventListener('detail', event => {
                        window.location.href = `../subject/index.html?id=${event.detail.code}`;
                    });
                    $result.appendChild($subject);
                });
            } else {
                let $alert = document.createElement('alert-message');
                $alert.setAttribute('message', 'Nenhum resultado encontrado!');
                $result.appendChild($alert);
            }
        } catch (error) {
            console.log(error.message);
        }
    } else if ($search.value.length === 0) {
        $result.innerHTML = '';
        $search.parentElement.classList.remove('hover');
    }
}

init();
