async function checkSession() {
    const response = await fetch('http://localhost:3000/session-check', { // Adjust to your backend URL
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Important: sends cookies with the request
    });

    const result = await response.json();

    if (result.active) {
        document.getElementById('welcomeMessage').textContent = `Hello, ${result.user.username}!`;
        document.getElementById('loggedInContent').style.display = 'block';
    } else {
        document.getElementById('loggedOutContent').style.display = 'block';
    }
}

document.getElementById('logoutButton').addEventListener('click', async function() {
    await fetch('http://localhost:3000/logout', { // Adjust to your backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Important: sends cookies with the request
    });

    window.location.href = 'login.html';
});

checkSession();
