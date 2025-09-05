
import React from "react";

export default function PainelAdm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Painel do Administrador - Padaria Sustentável
        </h1>

        {/* Resumo de indicadores principais */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Produtos Cadastrados</h2>
            <p className="text-2xl font-bold text-blue-600">128</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Itens Próximos do Vencimento</h2>
            <p className="text-2xl font-bold text-yellow-600">8</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Taxa de Desperdício</h2>
            <p className="text-2xl font-bold text-red-600">12%</p>
          </div>
        </div>

        {/* Atalhos para funcionalidades */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <button className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700">
            Cadastrar Produto
          </button>
          <button className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700">
            Consultar Produtos
          </button>
          <button className="bg-red-600 text-white p-6 rounded-xl shadow hover:bg-red-700">
            Registrar Desperdício
          </button>
          <button className="bg-purple-600 text-white p-6 rounded-xl shadow hover:bg-purple-700">
            Relatórios
          </button>
        </div>
      </div>
    </div>
  );
}