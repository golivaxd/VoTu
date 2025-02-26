const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static(__dirname + '/F'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/F/index.html');
});

app.get('/usuarios', async (req, res) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

app.post('/login', async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo_electronico', correo_electronico)
        .eq('contrasena', contrasena)
        .single();

    if (error || !data) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user: data });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});