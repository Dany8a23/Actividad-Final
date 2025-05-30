import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ id_usuario: '', usuario: '', contraseña: '' });
  const [editando, setEditando] = useState(false);

  const API_URL = 'http://localhost:3000/usuarios';

  const obtenerUsuarios = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsuarios(data);
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const metodo = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${form.id_usuario}` : API_URL;

    await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ id_usuario: '', usuario: '', contraseña: '' });
    setEditando(false);
    obtenerUsuarios();
  };

  const manejarEditar = (usuario) => {
    setForm(usuario);
    setEditando(true);
  };

  const manejarEliminar = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      obtenerUsuarios();
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="app-container">
      <h1 className="titulo">Gestión de Usuarios</h1>

      <form onSubmit={manejarEnvio} className="formulario">
        <input type="text" name="id_usuario" placeholder="ID Usuario" value={form.id_usuario} onChange={manejarCambio} required disabled={editando} />
        <input type="text" name="usuario" placeholder="Nombre de usuario" value={form.usuario} onChange={manejarCambio} required />
        <input type="text" name="contraseña" placeholder="Contraseña" value={form.contraseña} onChange={manejarCambio} required />
        <button type="submit">{editando ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
      </form>

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.usuario}</td>
              <td>{'*'.repeat(usuario.contraseña.length)}</td>
              <td>
                <button className="btn-editar" onClick={() => manejarEditar(usuario)}>Editar</button>
                <button className="btn-eliminar" onClick={() => manejarEliminar(usuario.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
