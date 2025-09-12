import React from 'react';

function ProductList({ products }) {
  const isNearExpiry = (date) => {
    const today = new Date();
    const expiry = new Date(date);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  return (
    <div className="list-container">
      <h2>Lista de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço Custo</th>
            <th>Preço Venda</th>
            <th>Vencimento</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={isNearExpiry(product.expiryDate) ? 'near-expiry' : ''}
            >
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>R$ {product.costPrice}</td>
              <td>R$ {product.salePrice}</td>
              <td>{product.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="near-expiry-legend">
        * Produtos com vencimento próximo (30 dias) estão destacados.
      </p>
    </div>
  );
}

export default ProductList;