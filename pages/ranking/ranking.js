import '../../components/ranking-item/ranking-item.js';
import '../../components/alert-message/alert-message.js';
import '../../components/header-menu/header-menu.js';
import TokenService   from '../../services/TokenService.js';
import SubjectService from '../../services/SubjectService.js';

const URL_SUBJECT = '../subject/index.html?id=';

function initialize() {
    addHeader();
    listRanking();
}

function addHeader() {
    const $header = document.getElementById('main-header');
    const $headerElement = document.createElement('header-menu');
    $headerElement.setAttribute('username', TokenService.getUserFirstName());
    $headerElement.setAttribute('logged', TokenService.isLogged().toString());
    $headerElement.addEventListener('logout', TokenService.logout);
    $header.appendChild($headerElement);
}

async function listRanking() {
    const $comments = document.querySelector('#comments');
    const $likes = document.querySelector('#likes');

    try {
        const ranking = await SubjectService.ranking();
        $comments.innerHTML = '';
        $likes.innerHTML = '';
        console.log(ranking);
        addTop(ranking.rankingComments, $comments);
        addTop(ranking.rankingLikes, $likes);
    } catch (error) {
        console.log(error.message);
    }
}

function addTop(subjects, element) {
    subjects.forEach((subject, key) => {
        let $subject = document.createElement('ranking-item');
        $subject.setAttribute('position', key + 1);
        $subject.setAttribute('code', subject.id);
        $subject.setAttribute('name', subject.name);
        $subject.setAttribute('counter', subject.num);
        $subject.addEventListener('detail', () => {
            window.location.href = `${URL_SUBJECT}${subject.id}`;
        });
        element.appendChild($subject);
    });
}

initialize();
