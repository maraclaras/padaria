// src/App.jsx
import React, { useState } from 'react';
import ConsultaProdutos from './ConsultaProdutos';
import CadastroProdutos from './CadastroProdutos';
import Relatorios from './Relatorios';
import PainelAdm from './PainelAdm'; // Import the new component

import './App.css';

function App() {
  // Set the initial page to 'painel' so the user lands on the admin dashboard
  const [paginaAtual, setPaginaAtual] = useState('painel'); 

  return (
    <div className="App p-8">
      {/* Add a button for the new component */}
      <div className="mb-4 text-center">
        <button
          onClick={() => setPaginaAtual('painel')}
          className={`px-4 py-2 mr-2 rounded-lg ${paginaAtual === 'painel' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Painel do Administrador
        </button>
        <button
          onClick={() => setPaginaAtual('consulta')}
          className={`px-4 py-2 mr-2 rounded-lg ${paginaAtual === 'consulta' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Consulta de Produtos
        </button>
        <button
          onClick={() => setPaginaAtual('cadastro')}
          className={`px-4 py-2 mr-2 rounded-lg ${paginaAtual === 'cadastro' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Cadastro de Produtos
        </button>
        <button
          onClick={() => setPaginaAtual('relatorios')}
          className={`px-4 py-2 rounded-lg ${paginaAtual === 'relatorios' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Relatórios Gerenciais
        </button>
      </div>

      {/* Update the conditional rendering to include the new component */}
      {paginaAtual === 'painel' && <PainelAdm />}
      {paginaAtual === 'consulta' && <ConsultaProdutos />}
      {paginaAtual === 'cadastro' && <CadastroProdutos />}
      {paginaAtual === 'relatorios' && <Relatorios />}
    </div>
  );
}

export default App;