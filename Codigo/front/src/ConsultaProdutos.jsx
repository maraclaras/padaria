import React from "react";

export default function WireframeConsultaProdutos() { return ( <div className="flex items-center justify-center min-h-screen bg-[#f7f3e9] p-6"> <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-6"> <h1 className="text-xl font-bold mb-4 text-center"> Wireframe - Consulta de Produtos </h1>

{/* Barra de busca */}
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Buscar produto..."
        className="flex-grow rounded-l-lg border-[#f0e6d6] shadow-sm px-3"
      />
      <button className="px-4 py-2 bg-[#a0d2db] text-white rounded-r-lg">
        Buscar
      </button>
    </div>

    {/* Tabela de produtos */}
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-[#f0e6d6]">
          <tr>
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Categoria</th>
            <th className="px-4 py-2 border">Preço de Venda (R$)</th>
            <th className="px-4 py-2 border">Validade</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">Pão Francês</td>
            <td className="px-4 py-2 border">Pães</td>
            <td className="px-4 py-2 border">0,80</td>
            <td className="px-4 py-2 border">07/09/2025</td>
            <td className="px-4 py-2 border text-[#f2e6b6] font-semibold">
              Próximo do vencimento
            </td>
            <td className="px-4 py-2 border">
              <button className="px-2 py-1 bg-[#a491d3] text-white rounded mr-2">
                Editar
              </button>
              <button className="px-2 py-1 bg-[#e0b5b5] text-white rounded">
                Excluir
              </button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Bolo de Chocolate</td>
            <td className="px-4 py-2 border">Bolos</td>
            <td className="px-4 py-2 border">25,00</td>
            <td className="px-4 py-2 border">12/09/2025</td>
            <td className="px-4 py-2 border text-[#a0d2db] font-semibold">
              Dentro da validade
            </td>
            <td className="px-4 py-2 border">
              <button className="px-2 py-1 bg-[#a491d3] text-white rounded mr-2">
                Editar
              </button>
              <button className="px-2 py-1 bg-[#e0b5b5] text-white rounded">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
); }