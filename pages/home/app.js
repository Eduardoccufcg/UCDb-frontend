import '../../components/subject-item/index.js';
import TokenService  from '../../services/TokenService.js';
import { searchSubjects } from '../../services/SubjectService.js';

document
    .querySelector('#searchSubject input')
    .addEventListener('keyup', search);

async function search(event) {
    const $search = document.querySelector('#searchSubject input');
    const $result = document.getElementById('result');

    if (event.which === 13 || $search.value.length >= 3) {
        try {
            $result.innerHTML = '';
            $search.parentElement.classList.add('hover');

            const subjects = await searchSubjects($search.value);
            subjects.forEach(subject => {
                let $subject = document.createElement('subject-item');
                $subject.setAttribute('code', subject.id);
                $subject.setAttribute('name', subject.name);
                $subject.setAttribute('show-detail', TokenService.hasToken().toString());
                $result.appendChild($subject);
            });
        } catch (error) {
            console.log(error.message);
        }
    } else if ($search.value.length === 0) {
        $result.innerHTML = '';
        $search.parentElement.classList.remove('hover');
    }
}
