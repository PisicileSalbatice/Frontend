import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pentru pagina de Home */}
        <Route path="/home" element={<HomePage />} />
        
        

        {/* Redirecționare implicită către HomePage */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
