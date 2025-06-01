import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import jwt_decode from 'jwt-decode';

const Home = () => {
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setTipoUsuario(decoded.tipo_usuario);
    }
  }, []);

  return (
    <div>
      <Navbar tipoUsuario={tipoUsuario} />
      <h1>Bienvenido a Patitas a la Obra 🐾</h1>
    </div>
  );
};

export default Home;
