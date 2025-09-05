import React from "react";

export default function PainelAdm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f3e9] p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Painel do Administrador - Padaria Sustentável
        </h1>

        {/* Resumo de indicadores principais */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#f0e6d6] p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Produtos Cadastrados</h2>
            <p className="text-2xl font-bold text-[#a491d3]">128</p>
          </div>
          <div className="bg-[#f0e6d6] p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Itens Próximos do Vencimento</h2>
            <p className="text-2xl font-bold text-[#f2e6b6]">8</p>
          </div>
          <div className="bg-[#f0e6d6] p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Taxa de Desperdício</h2>
            <p className="text-2xl font-bold text-[#e0b5b5]">12%</p>
          </div>
        </div>

        {/* Atalhos para funcionalidades */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <button className="bg-[#a0d2db] text-white p-6 rounded-xl shadow hover:bg-[#86b5c0]">
            Cadastrar Produto
          </button>
          <button className="bg-[#a491d3] text-white p-6 rounded-xl shadow hover:bg-[#927bc6]">
            Consultar Produtos
          </button>
          <button className="bg-[#e0b5b5] text-white p-6 rounded-xl shadow hover:bg-[#d0a5a5]">
            Registrar Desperdício
          </button>
          <button className="bg-[#f2e6b6] text-white p-6 rounded-xl shadow hover:bg-[#dccf96]">
            Relatórios
          </button>
        </div>
      </div>
    </div>
  );
}