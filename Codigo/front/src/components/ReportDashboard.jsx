import React from 'react';

// Adicionado onDeleteWaste nas props
function ReportDashboard({ wasteRecords, products, onDeleteWaste }) {
  
  // Calcular Perda Financeira Total
  const totalFinancialLoss = wasteRecords.reduce((total, record) => {
    const quantity = parseInt(record.quantity) || 0;
    const costPrice = parseFloat(record.costPrice) || 0;
    return total + (quantity * costPrice);
  }, 0);

  // Calcular Custo Total Estimado dos Produtos
  const totalCostOfProducts = products.reduce((total, product) => {
    return total + parseFloat(product.costPrice); 
  }, 0);
  
  // Calcular Taxa de Desperdício 
  let wasteRate = 0;
  const totalCostBase = totalFinancialLoss + totalCostOfProducts;
  
  if (totalCostBase > 0) {
    wasteRate = (totalFinancialLoss / totalCostBase) * 100;
  }
  
  return (
    <div className="content-box">
      <h2 className="report-title">Relatórios Gerenciais</h2>
      
      <div className="statistics-container">
        <div className="stat-card">
          <h3>Taxa de Desperdício</h3>
          <div className="value-box">{wasteRate.toFixed(2)}%</div>
        </div>
        <div className="divider"></div>
        <div className="stat-card">
          <h3>Perda Financeira</h3>
          <div className="value-box">R$ {totalFinancialLoss.toFixed(2)}</div>
        </div>
      </div>

      <h2 className="content-box-title" style={{textAlign: 'center', marginTop: '40px'}}>Registros de Desperdício</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Motivo</th>
            <th>Perda Total (RS)</th>
            <th>Ações</th> {/* Nova coluna */}
          </tr>
        </thead>
        <tbody>
          {wasteRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.productName}</td>
              <td>{record.quantity}</td>
              <td>{record.reason}</td>
              <td>R$ {((parseInt(record.quantity) || 0) * (parseFloat(record.costPrice) || 0)).toFixed(2)}</td>
              <td className="actions-cell">
                 {/* Botão de Excluir Desperdício */}
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

export default ReportDashboard;