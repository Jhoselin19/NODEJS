const express = require('express');
const app = express();

// Middleware para procesar datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.sendFile('./scripts/index.html', {
        root: __dirname
    })
});
app.get('/about',(req,res) => {
    res.sendFile('./scripts/about.html', {
        root: __dirname
    })
});

// Nueva ruta para manejar el envío de formulario de contacto
app.post('/enviarContacto', (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const mensaje = req.body.mensaje;

    // Aquí puedes hacer lo que quieras con los datos, como guardarlos en un archivo JSON
    // Por ejemplo, podrías guardarlos en un archivo JSON así:
    const fs = require('fs');
    const datosContacto = { nombre, email, mensaje };
    fs.writeFileSync('datosContacto.json', JSON.stringify(datosContacto, null, 2));

    res.send(`Datos de contacto recibidos: Nombre: ${nombre}, Correo electrónico: ${email}, Mensaje: ${mensaje}`);
});

app.get('/contact', (req, res) => {
    res.sendFile('./scripts/contact.html', {
        root: __dirname
    });
});

app.use((req, res) => {
    res.status(404).send('No se encontro tu pagina ...!!1');
});

app.listen(3000, () => {
    console.log(`Server on port ${3000}`);
});
