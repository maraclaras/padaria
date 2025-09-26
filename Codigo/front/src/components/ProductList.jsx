import React from 'react';

function ProductList({ products }) {
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
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.costPrice}</td>
              <td>{product.salePrice}</td>
              <td>{product.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;