import React from 'react';
import { Link } from 'react-router-dom';

// Adicionado onDeleteProduct nas props
function ProductList({ products, onDeleteProduct }) {
  return (
    <div className="content-box">
      <h2 className="content-box-title">Lista de Produtos</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço de Custo</th>
            <th>Preço de Venda</th>
            <th>Data de Vencimento</th>
            <th style={{width: '150px'}}>Ações</th> {/* Ajusta largura para acomodar 2 botões */}
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
                {/* Botão de Excluir */}
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
    </div>
  );
}

export default ProductList;