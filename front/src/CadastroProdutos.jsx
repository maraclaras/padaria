// src/CadastroProdutos.js
import React from 'react';

export default function CadastroProdutos() {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastro de Produtos
      </h1>

      <form className="w-full space-y-4">
        {/* Campo para o Nome do Produto */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome do Produto
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ex: Pão Integral"
          />
        </div>

        {/* Campo para a Quantidade */}
        <div>
          <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
            Quantidade
          </label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ex: 50"
          />
        </div>

        {/* Campo para a Data de Validade */}
        <div>
          <label htmlFor="validade" className="block text-sm font-medium text-gray-700">
            Data de Validade
          </label>
          <input
            type="date"
            id="validade"
            name="validade"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Campo para a Descrição (opcional) */}
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
            Descrição (opcional)
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Detalhes sobre o produto e seus ingredientes."
          />
        </div>

        {/* Botão de Envio */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  );
}