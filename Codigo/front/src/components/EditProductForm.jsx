import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProductForm({ products, onSave }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productToEdit = products.find(p => p.id === parseInt(productId));
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productId, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (product.name && product.costPrice && product.salePrice) {
      onSave(product);
    }
  };

  const handleCancel = () => {
    navigate('/manage');
  };

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="edit-container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoria</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Preço de Custo</label>
          <input
            type="number"
            name="costPrice"
            value={product.costPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Preço de Venda</label>
          <input
            type="number"
            name="salePrice"
            value={product.salePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data de Vencimento</label>
          <input
            type="date"
            name="expiryDate"
            value={product.expiryDate}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;