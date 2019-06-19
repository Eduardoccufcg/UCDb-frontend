import { doLogin }  from "../services/AuthService.js";
import TokenService from '../services/TokenService.js';

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
        window.location.href = 'welcome.html';
    } catch (error) {
        showError(error.message);
    }
}

function showError(errorMessage) {
    const $error = document.getElementById('error');
    const alert = `
    <div class="alert alert-danger alert-dismissible fade show my-3" role="alert">
        <strong>Erro!</strong> ${errorMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;

    $error.innerHTML = alert;
}
