import React, { useState, useEffect } from 'react';

function SalesFormModal({ onClose, onSubmit, initialData = {}, isEditing = false }) {
    const [formData, setFormData] = useState({
        productName: initialData.productName || '',
        quantity: initialData.quantity || 1,
        costPrice: initialData.costPrice || 0.00,
        salePrice: initialData.salePrice || 0.00,
        date: initialData.date || new Date().toISOString().substring(0, 10),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseInt(value) || 0 : parseFloat(value) || value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Converte para números antes de enviar
        const dataToSend = {
            ...formData,
            quantity: parseInt(formData.quantity),
            costPrice: parseFloat(formData.costPrice),
            salePrice: parseFloat(formData.salePrice),
        };
        onSubmit(dataToSend);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content" style={{ width: '400px' }}>
                <h2 className="modal-title">{isEditing ? 'Editar Venda' : 'Registrar Nova Venda'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="productName">Produto:</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Data da Venda:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantidade Vendida:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="costPrice">Custo Unitário (R$):</label>
                        <input
                            type="number"
                            id="costPrice"
                            name="costPrice"
                            value={formData.costPrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="salePrice">Preço de Venda Unitário (R$):</label>
                        <input
                            type="number"
                            id="salePrice"
                            name="salePrice"
                            value={formData.salePrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="secondary-button">
                            Cancelar
                        </button>
                        <button type="submit" className="primary-button">
                            {isEditing ? 'Salvar Alterações' : 'Registrar Venda'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SalesFormModal;
