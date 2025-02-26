// import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchUsuarios();

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const correo_electronico = document.getElementById('correo_electronico').value;
            const contrasena = document.getElementById('contrasena').value;
            await login(correo_electronico, contrasena);
        });
    }
});

async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:3001/usuarios');
        const data = await response.json();

        console.log('Data received from server:', data);

        const usuariosLista = document.getElementById('usuarios-lista');
        if (usuariosLista) {
            usuariosLista.innerHTML = data.map(usuario => `<p>${usuario.nombre_usuario}</p>`).join('');
        } else {
            console.error('Element with ID "usuarios-lista" not found.');
        }
    } catch (error) {
        console.error('Error fetching usuarios:', error);
    }
}

async function login(correo_electronico, contrasena) {
    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo_electronico, contrasena })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
            // Redirigir al usuario a HTML/dashboard.html
            window.location.href = 'HTML/dashboard.html';
        } else {
            console.error('Login failed:', data);
            alert('Login failed: ' + data.error);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login: ' + error.message);
    }
}