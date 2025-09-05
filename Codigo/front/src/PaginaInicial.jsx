import React from 'react';
import { Link } from 'react-router-dom';

export default function PaginaInicial() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f3e9] p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#8c7851]">
          Bem-vindo à Padaria Sustentável
        </h1>
        <p className="text-lg text-[#3b3a30] mb-8">
          Gerencie o seu inventário de forma eficiente e sustentável. Nosso sistema ajuda a monitorar produtos, reduzir o desperdício e otimizar o estoque.
        </p>
        <Link 
          to="/painel" 
          className="inline-block py-3 px-8 rounded-xl shadow bg-[#a491d3] text-white font-semibold hover:bg-[#927bc6] transition-colors"
        >
          Acessar Painel do Administrador
        </Link>
      </div>
    </div>
  );
}