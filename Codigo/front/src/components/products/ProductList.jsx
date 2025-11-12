import React from 'react';
import { Link } from 'react-router-dom';

// O componente agora foca apenas na exibição da tabela, recebendo produtos filtrados/paginados
function ProductList({ products, onDeleteProduct }) {
  // Se a lista estiver vazia, exibe uma mensagem
  if (products.length === 0) {
      return <p style={{textAlign: 'center', margin: '20px 0'}}>Nenhum produto encontrado com os filtros aplicados.</p>;
  }
    
  return (
    // Removido o content-box e o título, que agora são responsabilidade do container pai
    <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço de Custo</th>
            <th>Preço de Venda</th>
            <th>Data de Vencimento</th>
            <th style={{width: '150px'}}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>R$ {parseFloat(product.costPrice).toFixed(2)}</td>
              <td>R$ {parseFloat(product.salePrice).toFixed(2)}</td>
              <td>{product.expiryDate}</td>
              <td className="actions-cell">
                <Link to={`/edit/${product.id}`} className="action-button edit-button">
                    Editar
                </Link>
                <button 
                    onClick={() => onDeleteProduct(product.id)} 
                    className="action-button delete-button"
                >
                    Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

export default ProductList;