import React from 'react';

function SalesTable({ records, onDelete, onEdit }) {
    return (
        <div className="content-box">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Qtd</th>
                        <th>Receita (R$)</th>
                        <th>Lucro (R$)</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>{record.productName}</td>
                            <td>{record.quantity}</td>
                            <td>R$ {record.revenue.toFixed(2)}</td>
                            <td style={{ color: record.profit > 0 ? '#4CAF50' : '#D32F2F' }}>
                                R$ {record.profit.toFixed(2)}
                            </td>
                            <td className="actions-cell">
                                <button 
                                    onClick={() => onEdit(record)} 
                                    className="action-button edit-button"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDelete(record.id)} 
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

export default SalesTable;
