import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const getButtonClass = (path) =>
    `px-4 py-2 mr-2 rounded-lg ${
      location.pathname === path ? 'bg-[#a491d3] text-white' : 'bg-[#f0e6d6]'
    }`;

  return (
    <div className="mb-4 text-center">
      <Link to="/" className={getButtonClass('/')}>
        Página Inicial
      </Link>
      <Link to="/painel" className={getButtonClass('/painel')}>
        Painel do Administrador
      </Link>
      <Link to="/consulta" className={getButtonClass('/consulta')}>
        Consulta de Produtos
      </Link>
      <Link to="/cadastro" className={getButtonClass('/cadastro')}>
        Cadastro de Produtos
      </Link>
      <Link to="/relatorios" className={getButtonClass('/relatorios')}>
        Relatórios Gerenciais
      </Link>
    </div>
  );
}