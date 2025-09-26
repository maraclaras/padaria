import React from 'react';

function ReportDashboard({ wasteRecords }) {
  return (
    <div className="content-box">
      <h2 className="report-title">Relatórios Gerenciais</h2>
      
      <div className="statistics-container">
        <div className="stat-card">
          <h3>Taxa de Desperdício</h3>
          <div className="value-box">Valor em %</div>
        </div>
        <div className="divider"></div>
        <div className="stat-card">
          <h3>Perda Financeira</h3>
          <div className="value-box">Valor em R$</div>
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
    </div>
  );
}

export default ReportDashboard;