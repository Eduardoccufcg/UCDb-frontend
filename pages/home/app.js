import '../../components/subject-item/index.js';
import { searchSubjects } from '../../services/SubjectService.js';

document
    .querySelector('#searchSubject input')
    .addEventListener('keyup', search);

async function search(event) {
    const $search = document.querySelector('#searchSubject input');
    const $result = document.getElementById('result');

    if (event.which === 13 || $search.value.length >= 3) {
        try {
            const subjects = await searchSubjects($search.value);
            $result.innerHTML = '';
            subjects.forEach(subject => {
                let $subject = document.createElement('subject-item');
                $subject.setAttribute('code', subject.id);
                $subject.setAttribute('name', subject.name);
                $result.appendChild($subject);
            });
        } catch (error) {
            console.log(error.message);
        }
    } else if ($search.value.length === 0) {
        $result.innerHTML = '';
    }
}
