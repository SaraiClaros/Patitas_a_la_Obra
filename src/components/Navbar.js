import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ tipoUsuario }) => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', marginBottom: '20px' }}>
      <Link to="/">Inicio</Link>
      {tipoUsuario === 'veterinaria' && <Link to="/consultas">Consultas</Link>}
      {tipoUsuario === 'refugio' && <Link to="/adopciones">Adopciones</Link>}
      {tipoUsuario === 'usuario' && <Link to="/perfil">Mi Perfil</Link>}
      <Link to="/logout">Cerrar sesión</Link>
    </nav>
  );
};

export default Navbar;
