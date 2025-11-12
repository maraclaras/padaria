import React, { useState } from 'react';

function CategoryManagement({ categories, products, onAddCategory, onUpdateCategory, onDeleteCategory }) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setError('O nome da categoria não pode ser vazio.');
      return;
    }
    const name = newCategoryName.trim();
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        setError('Esta categoria já existe.');
        return;
    }
    onAddCategory(name);
    setNewCategoryName('');
    setError('');
  };

  const handleStartEdit = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setError('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setError('O nome da categoria não pode ser vazio.');
      return;
    }
    
    const updatedName = newCategoryName.trim();
    
    // Validação para evitar duplicidade durante a edição
    const isDuplicate = categories.some(
        c => c.name.toLowerCase() === updatedName.toLowerCase() && c.id !== editingCategory.id
    );

    if (isDuplicate) {
        setError('Outra categoria com este nome já existe.');
        return;
    }
    
    onUpdateCategory(editingCategory.id, updatedName);
    setEditingCategory(null);
    setNewCategoryName('');
    setError('');
  };
  
  const handleCancelEdit = () => {
      setEditingCategory(null);
      setNewCategoryName('');
      setError('');
  };

  const handleDelete = (categoryId) => {
    const isAssociated = products.some(p => 
        // Verifica se o nome da categoria está associado a algum produto
        p.category === categories.find(c => c.id === categoryId)?.name
    );

    if (isAssociated) {
      alert("Validação: Não é possível excluir esta categoria. Há produtos ativos associados a ela.");
      return;
    }

    onDeleteCategory(categoryId);
  };

  return (
    // 1. Container principal para centralizar o bloco
    <div className="category-management-container"> 
        {/* 2. Container flexível para as duas colunas (Formulário e Lista) */}
        <div className="category-management-flex-content">
            <div className="content-box category-form-box">
                <h2 className="content-box-title">
                    {editingCategory ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
                </h2>
                <form onSubmit={editingCategory ? handleSaveEdit : handleAddCategory} className="styled-form">
                    <input
                        type="text"
                        placeholder="Nome da Categoria (ex: Laticínios)"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <div className="button-group-edit">
                        <button type="submit" className="save-button">
                            {editingCategory ? 'Salvar Edição' : 'Adicionar'}
                        </button>
                        {editingCategory && (
                            <button type="button" onClick={handleCancelEdit} className="cancel-button">
                                Cancelar
                            </button>
                        )}
                    </div>
                    {error && <p className="error" style={{color: '#D32F2F', marginTop: '10px'}}>{error}</p>}
                </form>
            </div>

            <div className="content-box category-list-box">
                <h2 className="content-box-title">Categorias Cadastradas</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th style={{width: '150px'}}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td className="actions-cell">
                                    <button
                                        onClick={() => handleStartEdit(category)}
                                        className="action-button edit-button"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
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
        </div>
    </div>
  );
}

export default CategoryManagement;