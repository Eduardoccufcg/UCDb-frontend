import AuthService   from '../../services/AuthService.js';
import TokenService  from '../../services/TokenService.js';
import { showError } from '../utils.js';

const URL_HOME = '../home/';

document.addEventListener('DOMContentLoaded', () => {
    if (TokenService.isLogged()) {
        window.location.href = URL_HOME;
    } else {
        document
            .querySelector('#authForm')
            .addEventListener('submit', login);
    }
});

async function login(event) {
    event.preventDefault();
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const data = await AuthService.login(email, password);
        TokenService.setToken(data.token);
        window.location.href = URL_HOME;
    } catch (error) {
        showError(error.message);
    }
}
