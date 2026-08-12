document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-login-form');
    const errorMsg = document.getElementById('login-error-msg');

    // Resetăm formularul de fiecare dată când se revine pe pagină (inclusiv prin butonul Back)
    window.addEventListener('pageshow', () => {
        adminForm.reset();
        errorMsg.textContent = '';
    });

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('admin-username').value;
        const passwordInput = document.getElementById('admin-password').value;

        if (usernameInput === 'admin' && passwordInput === '2005') {
            errorMsg.textContent = '';
            adminForm.reset(); // Golim câmpurile înainte de redirecționare
            window.location.href = 'admin-dashboard.html';
        } else {
            errorMsg.textContent = 'Datele introduse sunt incorecte!';
        }
    });
});