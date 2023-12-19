import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from "./pages/Login.js";
import Registro from "./pages/Registro.js";
import PrincipalCuidador from "./pages/Cuidador/PrincipalCuidador.js";
import SeleccionarMascota from "./pages/Cuidador/SelecionarMascota.js";
import AtenderMascota from "./pages/Cuidador/AtenderMascota.js";



import './App.css';

function App() {
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registerForm" element={<Registro/>}/>
        <Route path="/principalcuidador" element={<PrincipalCuidador/>}/>
        <Route path="/seleccionarmascota" element={<SeleccionarMascota/>}/>
        <Route path="/atendermascota" element={<AtenderMascota/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;