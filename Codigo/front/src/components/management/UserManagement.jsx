import React, { useState } from 'react';

function UserManagement({ users, onAddUser, onUpdateUser, onDeleteUser, onResetPassword }) {
  const [formData, setFormData] = useState({ id: null, username: '', password: '', isActive: true });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
        ...formData, 
        [name]: type === 'checkbox' ? checked : value 
    });
    setError('');
  };

  const handleStartEdit = (user) => {
    setFormData({
      id: user.id,
      username: user.username,
      password: '', 
      isActive: user.isActive
    });
    setError('');
  };

  const handleCancelEdit = () => {
    setFormData({ id: null, username: '', password: '', isActive: true });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username) {
        setError('O nome de usuário não pode ser vazio.');
        return;
    }
    
    const isDuplicate = users.some(
        u => u.username.toLowerCase() === formData.username.toLowerCase() && u.id !== formData.id
    );
    if (isDuplicate) {
        setError('Este nome de usuário já existe.');
        return;
    }

    if (formData.id) {
      onUpdateUser(formData.id, formData);
    } else {
      if (!formData.password) {
          setError('A senha é obrigatória para novos usuários.');
          return;
      }
      onAddUser(formData);
    }
    handleCancelEdit();
  };
  
  const handleReset = (userId, username) => {
      const newPassword = window.prompt(`Digite a nova senha para ${username}:`);
      if (newPassword && newPassword.length >= 6) {
          onResetPassword(userId, newPassword);
          alert(`Senha de ${username} redefinida com sucesso.`);
      } else if (newPassword !== null && newPassword.length < 6) {
          alert('A senha deve ter pelo menos 6 caracteres.');
      }
  };


  return (
    <div className="user-management-container">
        <div className="user-management-flex-content">
            {/* Formulário de Criação/Edição */}
            <div className="content-box user-form-box">
                <h2 className="content-box-title">
                    {formData.id ? 'Editar Usuário' : 'Novo Administrador'}
                </h2>
                <form onSubmit={handleSubmit} className="styled-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Nome de Usuário"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder={formData.id ? "Nova Senha (opcional)" : "Senha *"}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    
                    {formData.id && (
                        <div className="form-checkbox-group">
                            <input
                                type="checkbox"
                                name="isActive"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="isActive" style={{display: 'inline', fontWeight: 'normal'}}>Conta Ativa</label>
                        </div>
                    )}
                    
                    <div className="button-group-edit" style={{marginTop: '20px'}}>
                        <button type="submit" className="save-button">
                            {formData.id ? 'Salvar Alterações' : 'Criar Usuário'}
                        </button>
                        {formData.id && (
                            <button type="button" onClick={handleCancelEdit} className="cancel-button">
                                Cancelar
                            </button>
                        )}
                    </div>
                    {error && <p className="error" style={{color: '#D32F2F', marginTop: '10px'}}>{error}</p>}
                </form>
            </div>

            {/* Lista de Usuários */}
            <div className="content-box user-list-box">
                <h2 className="content-box-title">Contas de Administrador</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuário</th>
                            <th>Status</th>
                            <th style={{width: '200px'}}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.isActive ? 'Ativo' : 'Desativado'}</td>
                                <td className="actions-cell">
                                    <button
                                        onClick={() => handleStartEdit(user)}
                                        className="action-button edit-button"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleReset(user.id, user.username)}
                                        className="action-button action-button-reset"
                                    >
                                        Redefinir Senha
                                    </button>
                                    {/* Botão de Ativar/Desativar */}
                                    <button
                                        onClick={() => onDeleteUser(user.id)}
                                        className="action-button delete-button"
                                        disabled={user.username === 'padariaReal'}
                                    >
                                        {/* O texto do botão alterna entre Desativar/Ativar */}
                                        {user.isActive ? 'Desativar' : 'Ativar'} 
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

export default UserManagement;