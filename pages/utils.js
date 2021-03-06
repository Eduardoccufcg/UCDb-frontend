import '../components/alert-message/alert-message.js';

function showMessage(message, type) {
    const $message = document.getElementById('message');
    const alert = document.createElement('alert-message');
    $message.innerHTML = '';
    alert.setAttribute('message', message);
    alert.setAttribute('type', type);
    $message.appendChild(alert);
}

export function showError(message) {
    showMessage(message, 'error');
}

export function showSuccess(message) {
    showMessage(message, 'success');
}
