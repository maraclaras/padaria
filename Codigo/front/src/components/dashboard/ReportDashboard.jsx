import React from 'react';

// Componente de Tabela de Desperdício (Definido localmente)
function WasteTable({ wasteRecords, products, onDeleteWaste }) {
    return (
        <div className="content-box">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Motivo</th>
                        <th>Perda Total (R$)</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {wasteRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.productName}</td>
                            <td>{record.quantity}</td>
                            <td>{record.reason}</td>
                            {/* Calcula a perda total usando o costPrice do produto */}
                            <td>R$ {((parseInt(record.quantity) || 0) * (parseFloat(products.find(p => p.name === record.productName)?.costPrice || 0))).toFixed(2)}</td>
                            <td className="actions-cell">
                                <button 
                                    onClick={() => onDeleteWaste(record.id)} 
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


function ReportDashboard({ wasteRecords, products, onDeleteWaste, simpleView = false }) {
    // Se estiver em modo simples (para a tela de Desperdício), apenas mostra a tabela
    if (simpleView) {
        // Passa a prop 'products' para o WasteTable para calcular o custo
        return <WasteTable wasteRecords={wasteRecords} products={products} onDeleteWaste={onDeleteWaste} />;
    }

    // Se não estiver em modo simples, mostra o relatório completo (o que não deve mais acontecer)
    // Este bloco é mantido apenas para evitar erros, mas a lógica de KPI foi movida para o Dashboard.jsx
    return (
        <div className="content-box">
            <h2 className="report-title">Relatórios Gerenciais (Descontinuado)</h2>
            <p>Os indicadores de performance foram movidos para o Painel Principal (Dashboard).</p>
            <h3 className="content-box-title" style={{textAlign: 'center', marginTop: '40px'}}>Registros de Desperdício</h3>
            <WasteTable wasteRecords={wasteRecords} products={products} onDeleteWaste={onDeleteWaste} />
        </div>
    );
}

export default ReportDashboard;
