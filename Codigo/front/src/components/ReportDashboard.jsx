import React from 'react';

function ReportDashboard({ products, wasteRecords }) {
  const totalProducts = products.reduce((sum, p) => sum + 1, 0); // Contagem simples de produtos
  const totalWastedQuantity = wasteRecords.reduce((sum, r) => sum + parseInt(r.quantity), 0);
  const totalFinancialLoss = wasteRecords.reduce((sum, r) => sum + (parseInt(r.quantity) * r.costPrice), 0);
  const wastePercentage = totalProducts > 0 ? (totalWastedQuantity / totalProducts) * 100 : 0;

  return (
    <div className="report-container">
      <h2>Relatórios Gerenciais</h2>
      <div className="report-stats">
        <div className="stat-card">
          <h3>Taxa de Desperdício</h3>
          <p>{wastePercentage.toFixed(2)}%</p>
          <p>em relação ao total de produtos cadastrados.</p>
        </div>
        <div className="stat-card">
          <h3>Perda Financeira</h3>
          <p>R$ {totalFinancialLoss.toFixed(2)}</p>
          <p>Gerada pelo desperdício de produtos.</p>
        </div>
      </div>
      <div className="report-details">
        <h3>Registros de Desperdício</h3>
        {wasteRecords.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Motivo</th>
                <th>Perda Total</th>
              </tr>
            </thead>
            <tbody>
              {wasteRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.productName}</td>
                  <td>{record.quantity}</td>
                  <td>{record.reason}</td>
                  <td>R$ {(record.quantity * record.costPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum desperdício registrado ainda.</p>
        )}
      </div>
    </div>
  );
}

export default ReportDashboard;