import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    costPrice: '',
    salePrice: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name && product.costPrice && product.salePrice) {
      onAddProduct(product);
      setProduct({
        name: '',
        category: '',
        costPrice: '',
        salePrice: '',
        expiryDate: '',
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome do Produto"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="costPrice"
          placeholder="Preço de Custo"
          value={product.costPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="salePrice"
          placeholder="Preço de Venda"
          value={product.salePrice}
          onChange={handleChange}
        />
        <label>Data de Vencimento:</label>
        <input
          type="date"
          name="expiryDate"
          value={product.expiryDate}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ProductForm;