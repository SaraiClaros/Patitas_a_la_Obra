import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Agrega más rutas aquí si lo necesitas */}
      </Routes>
    </Router>
  );
}

export default App;
