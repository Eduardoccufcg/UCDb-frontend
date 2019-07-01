import { doLogin }   from '../../services/AuthService.js';
import TokenService  from '../../services/TokenService.js';
import { showError } from '../utils.js';

document
    .querySelector('#authForm')
    .addEventListener('submit', login);

async function login(event) {
    event.preventDefault();
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const data = await doLogin(email, password);
        TokenService.setToken(data.token);
        window.location.href = '../home/index.html';
    } catch (error) {
        showError(error.message);
    }
}
