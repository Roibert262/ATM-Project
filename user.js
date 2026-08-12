document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('user-register-form');
    const loginForm = document.getElementById('user-login-form');
    const loginErrorMsg = document.getElementById('login-error-msg');
    const regErrorMsg = document.getElementById('reg-error-msg');

    const getUsers = () => JSON.parse(localStorage.getItem('atm_users')) || [];

    // --- RESET LA NAVEGARE BACK/FORWARD ---
    window.addEventListener('pageshow', () => {
        if (registerForm) registerForm.reset();
        if (loginForm) loginForm.reset();
        if (loginErrorMsg) loginErrorMsg.textContent = '';
        if (regErrorMsg) regErrorMsg.textContent = '';
    });

    // --- LOGICĂ REGISTER ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reg-name').value.trim();
            const pin = document.getElementById('reg-pin').value.trim();
            const dob = document.getElementById('reg-dob').value;

            const users = getUsers();

            const existingUser = users.find(u => u.pin === pin);
            if (existingUser) {
                if (regErrorMsg) regErrorMsg.textContent = 'This PIN is already in use!';
                return;
            }

            const newUser = {
                name: name,
                pin: pin,
                dob: dob,
                balance: 0,
                transactions: []
            };

            users.push(newUser);
            localStorage.setItem('atm_users', JSON.stringify(users));

            registerForm.reset();
            window.location.href = 'user-login.html';
        });
    }

    // --- LOGICĂ LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const pinInput = document.getElementById('user-pin').value.trim();
            const users = getUsers();

            const currentUser = users.find(u => u.pin === pinInput);

            if (currentUser) {
                if (loginErrorMsg) loginErrorMsg.textContent = '';
                localStorage.setItem('current_user', JSON.stringify(currentUser));
                loginForm.reset();
                window.location.href = 'user-dashboard.html';
            } else {
                if (loginErrorMsg) loginErrorMsg.textContent = 'Entered PIN is incorrect or does not exist!';
            }
        });
    }
});