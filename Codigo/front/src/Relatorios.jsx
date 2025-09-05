// src/Relatorios.jsx
import React from 'react';

export default function Relatorios() {
  return (
    <div className="flex flex-col items-center p-6 bg-[#f7f3e9] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[#8c7851]">
        Relatórios Gerenciais
      </h1>

      {/* Seção de Indicadores Chave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-[#3b3a30]">Produtos em Estoque</h2>
          <p className="text-4xl font-bold text-[#a491d3] mt-2">1,250</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-[#3b3a30]">Desperdício (Último Mês)</h2>
          <p className="text-4xl font-bold text-[#e0b5b5] mt-2">15%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-[#3b3a30]">Itens Próximos do Vencimento</h2>
          <p className="text-4xl font-bold text-[#f2e6b6] mt-2">28</p>
        </div>
      </div>

      {/* Seção de Gráficos (placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#3b3a30]">Histórico de Desperdício (Últimos 6 Meses)</h2>
          <div className="bg-[#f0e6d6] h-64 rounded-md flex items-center justify-center text-[#8c7851]">
            [Gráfico de Linhas: Placeholder]
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#3b3a30]">Distribuição de Produtos por Categoria</h2>
          <div className="bg-[#f0e6d6] h-64 rounded-md flex items-center justify-center text-[#8c7851]">
            [Gráfico de Pizza: Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}