import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProductForm({ products, onSave }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Busca o produto pelo ID (garantindo que o ID seja um número)
    const productToEdit = products.find(p => p.id === parseInt(productId));
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      // Caso não encontre, redireciona para a lista
      navigate('/'); 
    }
  }, [productId, products, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (product.name && product.costPrice && product.salePrice) {
      // Garante que o ID do produto editado seja mantido
      onSave({ ...product, id: parseInt(productId) });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!product) {
    return (
        <div className="edit-container-layout">
            <div className="content-box">
                <div>Carregando ou produto não encontrado...</div>
            </div>
        </div>
    );
  }

  return (
    // Usa classes existentes para estilização
    <div className="edit-container-layout">
        <div className="content-box">
            <h2 className="content-box-title">Editar Produto: {product.name}</h2>
            <form onSubmit={handleSave} className="styled-form">
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
                <div className="button-group-edit"> {/* Nova classe para agrupar botões */}
                    <button type="submit" className="save-button">Salvar Alterações</button>
                    <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default EditProductForm;