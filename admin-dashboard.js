document.addEventListener('DOMContentLoaded', () => {
    const usersListContainer = document.getElementById('users-list');

    function renderUsers() {
        // Preluăm lista actualizată din localStorage
        const users = JSON.parse(localStorage.getItem('atm_users')) || [];

        if (users.length === 0) {
            usersListContainer.innerHTML = '<p class="subtitle">No registered accounts found.</p>';
            return;
        }

        usersListContainer.innerHTML = '';

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.style.textAlign = 'center';
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p style="margin-top: 10px;">PIN: ${user.pin}</p>
                <p style="margin-top: 5px;">Balance: $${user.balance || 0}</p>
            `;

            userCard.addEventListener('click', () => {
                localStorage.setItem('selected_admin_user_pin', user.pin);
                window.location.href = 'admin-user-view.html';
            });

            usersListContainer.appendChild(userCard);
        });
    }

    // Randăm utilizatorii la prima încărcare
    renderUsers();

    // Re-randăm lista de fiecare dată când pagina devine vizibilă (ex: la butonul Back din browser)
    window.addEventListener('pageshow', () => {
        renderUsers();
    });
});