const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const usuarios = require('./usuarios')
const app = express()
const puerto = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

app.listen(puerto, () => {
    console.log('servicio iniciado')
})

// Rutas del CRUD para usuarios
// Crear usuario
app.post('/usuarios', async (req, res) => {
    const { id_usuario, usuario, contraseña } = req.body;
    try {
      const data = await usuarios.create({ id_usuario, usuario, contraseña });
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Leer todos los usuarios
  app.get('/usuarios', async (req, res) => {
    const data = await usuarios.findAll();
    res.json(data);
  });

  // Leer un usuario
  app.get('/usuarios/:id_usuario', async (req, res) => {
    const data = await usuarios.findByPk(req.params.id_usuario);
    data ? res.json(data) : res.status(404).send('No encontrado');
  });

  // Actualizar usuario
  app.put('/usuarios/:id_usuario', async (req, res) => {
    const updated = await usuarios.update(req.body, { where: { id_usuario: req.params.id_usuario } });
    updated[0] ? res.send('Actualizado') : res.status(404).send('No encontrado');
  });

  // Eliminar usuario
  app.delete('/usuarios/:id_usuario', async (req, res) => {
    const deleted = await usuarios.destroy({ where: { id_usuario: req.params.id_usuario } });
    deleted ? res.send('Eliminado') : res.status(404).send('No encontrado');
  });