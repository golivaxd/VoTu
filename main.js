// import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchUsuarios();
});

async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
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
