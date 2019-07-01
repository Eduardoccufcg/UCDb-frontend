import '../../components/subject-item/index.js';
import '../../components/alert-message/index.js';
import TokenService  from '../../services/TokenService.js';
import { searchSubjects } from '../../services/SubjectService.js';

document
    .querySelector('#searchSubject input')
    .addEventListener('keyup', search);

function init() {
    console.log(TokenService.getUserLoggedId());
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
