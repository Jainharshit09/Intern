document.getElementById('login').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', { // Adjust to your backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        credentials: 'include', // Important: sends cookies with the request
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
        alert(result.message);
        window.location.href = 'http://localhost:8080/index.html'; // Redirect to index.html after login
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password';
    }
});
