import '../../components/subject-item/index.js';
import '../../components/alert-message/index.js';
import '../../components/header-menu/index.js';
import TokenService                   from '../../services/TokenService.js';
import { searchSubjects, getSubject } from '../../services/SubjectService.js';

document
    .querySelector('#searchSubject input')


function addHeader() {
    const $header = document.getElementById('main-header');
    const $headerElement = document.createElement('header-menu');
    $headerElement.setAttribute('username', TokenService.getUserLoggedId());
    $headerElement.setAttribute('logged', TokenService.isLogged().toString());
    $headerElement.addEventListener('logout', TokenService.logout);
    $header.appendChild($headerElement);
}

function init() {
    const $searchBar = document.querySelector('#searchSubject input');
    $searchBar.addEventListener('keyup', search);
    $searchBar.addEventListener('focus', event => event.target.parentElement.classList.add('hover'));
    $searchBar.addEventListener('blur', event => {
       if(event.target.value === '') {
           event.target.parentElement.classList.remove('hover');
       }
    });
    addHeader();
}

async function search(event) {
    const $search = document.querySelector('#searchSubject input');
    const $result = document.getElementById('result');

    if (event.which === 13 || $search.value.length >= 3) {
        try {
            $result.innerHTML = '';
            $search.parentElement.classList.add('hover');

            const subjects = await searchSubjects($search.value);
            if (subjects.length > 0) {
                subjects.forEach(subject => {
                    let $subject = document.createElement('subject-item');
                    $subject.setAttribute('code', subject.id);
                    $subject.setAttribute('name', subject.name);
                    $subject.setAttribute('show-detail', TokenService.isLogged().toString());
                    $subject.addEventListener('detail', event => {
                        //showDetail(event.detail.code);
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

async function showDetail(idSubject) {
    try {
        const subject = await getSubject(idSubject, TokenService.getUserLoggedId());
        console.log(subject);
    } catch (e) {
        console.log(e);
    }
}

init();
