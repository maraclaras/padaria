import React, { useState } from 'react';

function WasteForm({ products, onRegisterWaste }) {
  const [waste, setWaste] = useState({
    productId: '',
    quantity: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWaste({ ...waste, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (waste.productId && waste.quantity && waste.reason) {
      const product = products.find(p => p.id === parseInt(waste.productId));
      if (product) {
        onRegisterWaste({
          ...waste,
          productName: product.name,
          costPrice: parseFloat(product.costPrice)
        });
        setWaste({ productId: '', quantity: '', reason: '' });
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Desperdício</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="product-select">Produto:</label>
        <select
          id="product-select"
          name="productId"
          value={waste.productId}
          onChange={handleChange}
        >
          <option value="">Selecione um produto</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <label>Quantidade Descartada:</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantidade"
          value={waste.quantity}
          onChange={handleChange}
        />
        <label>Motivo:</label>
        <input
          type="text"
          name="reason"
          placeholder="Motivo do Desperdício"
          value={waste.reason}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default WasteForm;