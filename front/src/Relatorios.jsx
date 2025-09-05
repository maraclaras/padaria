// src/Relatorios.jsx
import React from 'react';

export default function Relatorios() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Relatórios Gerenciais
      </h1>

      {/* Seção de Indicadores Chave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Produtos em Estoque</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">1,250</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Desperdício (Último Mês)</h2>
          <p className="text-4xl font-bold text-red-600 mt-2">15%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Itens Próximos do Vencimento</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">28</p>
        </div>
      </div>

      {/* Seção de Gráficos (placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Histórico de Desperdício (Últimos 6 Meses)</h2>
          <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center text-gray-500">
            [Gráfico de Linhas: Placeholder]
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Distribuição de Produtos por Categoria</h2>
          <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center text-gray-500">
            [Gráfico de Pizza: Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}