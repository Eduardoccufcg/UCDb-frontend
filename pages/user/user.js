import { showError, showSuccess } from '../utils.js';
import UserService                from '../../services/UserService.js';
import User                       from '../../models/User.js';

document
    .querySelector('#userForm')
    .addEventListener('submit', create);

async function create(event) {
    event.preventDefault();
    try {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await UserService.createUser({ firstName, lastName, email, password });
        const $userForm = document.getElementById('userForm');
        $userForm.reset();
        showSuccess('Usuario cadastrado com sucesso. Enviamos um e-mail de boas vindas!');
    } catch (error) {
        showError(error.message);
    }
}
