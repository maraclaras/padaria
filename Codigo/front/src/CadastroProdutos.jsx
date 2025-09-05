// src/CadastroProdutos.js
import React from 'react';

export default function CadastroProdutos() {
  return (
    <div className="flex flex-col items-center p-6 bg-[#f7f3e9] rounded-xl shadow-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#8c7851]">
        Cadastro de Produtos
      </h1>

      <form className="w-full space-y-4">
        {/* Campo para o Nome do Produto */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-[#3b3a30]">
            Nome do Produto
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="mt-1 block w-full px-3 py-2 border border-[#f0e6d6] rounded-md shadow-sm focus:outline-none focus:ring-[#a491d3] focus:border-[#a491d3] sm:text-sm"
            placeholder="Ex: Pão Integral"
          />
        </div>

        {/* Campo para a Quantidade */}
        <div>
          <label htmlFor="quantidade" className="block text-sm font-medium text-[#3b3a30]">
            Quantidade
          </label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            className="mt-1 block w-full px-3 py-2 border border-[#f0e6d6] rounded-md shadow-sm focus:outline-none focus:ring-[#a491d3] focus:border-[#a491d3] sm:text-sm"
            placeholder="Ex: 50"
          />
        </div>

        {/* Campo para a Data de Validade */}
        <div>
          <label htmlFor="validade" className="block text-sm font-medium text-[#3b3a30]">
            Data de Validade
          </label>
          <input
            type="date"
            id="validade"
            name="validade"
            className="mt-1 block w-full px-3 py-2 border border-[#f0e6d6] rounded-md shadow-sm focus:outline-none focus:ring-[#a491d3] focus:border-[#a491d3] sm:text-sm"
          />
        </div>

        {/* Campo para a Descrição (opcional) */}
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-[#3b3a30]">
            Descrição (opcional)
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-[#f0e6d6] rounded-md shadow-sm focus:outline-none focus:ring-[#a491d3] focus:border-[#a491d3] sm:text-sm"
            placeholder="Detalhes sobre o produto e seus ingredientes."
          />
        </div>

        {/* Botão de Envio */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#a0d2db] hover:bg-[#86b5c0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a0d2db]"
          >
            Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  );
}