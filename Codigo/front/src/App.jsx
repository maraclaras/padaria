import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConsultaProdutos from './ConsultaProdutos';
import CadastroProdutos from './CadastroProdutos';
import Relatorios from './Relatorios';
import PainelAdm from './PainelAdm';
import PaginaInicial from './PaginaInicial';
import Navbar from './Navbar';

import './App.css';

function App() {
  return (
    <div className="App p-8">
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/painel" element={<PainelAdm />} />
        <Route path="/consulta" element={<ConsultaProdutos />} />
        <Route path="/cadastro" element={<CadastroProdutos />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </div>
  );
}

export default App;