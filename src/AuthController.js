import { doLogin } from "./services/AuthService.js";

document
    .querySelector('#authForm button')
    .addEventListener('click', login);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    doLogin(email, password);
}
