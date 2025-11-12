import React from 'react';

function Dashboard({ products, wasteRecords, salesRecords }) {
  
  // --- Lógica de Cálculo dos KPIs (Movida do ReportDashboard) ---
  const calculateKPIs = () => {
    // 1. Perda Financeira Total (PFT) - soma de todas as perdas
    const totalFinancialLoss = wasteRecords.reduce((sum, record) => {
        const quantity = parseInt(record.quantity) || 0;
        const costPrice = parseFloat(record.costPrice) || 0;
        return sum + (quantity * costPrice);
    }, 0);

    // 2. Lucro Potencial Total (LPT) - soma de todos os lucros de vendas
    const totalPotentialProfit = salesRecords.reduce((sum, record) => sum + record.profit, 0);

    // 3. Custo Total Estimado dos Produtos (Base para TDI)
    const totalCostOfProducts = products.reduce((total, product) => {
        return total + parseFloat(product.costPrice); 
    }, 0);
    
    const totalCostBase = totalFinancialLoss + totalCostOfProducts;

    // 4. Taxa de Desperdício de Ingredientes (TDI)
    const wasteRate = totalCostBase > 0 ? (totalFinancialLoss / totalCostBase) * 100 : 0;

    // 5. Perda de Lucro Potencial (PLP) - o lucro que poderia ter sido obtido com os produtos desperdiçados
    const potentialProfitLoss = totalFinancialLoss * 1; 

    // 6. Taxa de Perda de Lucro de Vendas (TPLV)
    const profitLossRate = (totalPotentialProfit + potentialProfitLoss) > 0 
        ? (potentialProfitLoss / (totalPotentialProfit + potentialProfitLoss)) * 100 
        : 0;

    // 7. Projeção de Perda Anual (PPA) - baseado na perda financeira mensal
    const annualLossProjection = totalFinancialLoss * 12;

    return {
        totalProducts: products.length,
        wasteRate: wasteRate.toFixed(2),
        totalFinancialLoss: totalFinancialLoss.toFixed(2),
        totalPotentialProfit: totalPotentialProfit.toFixed(2),
        potentialProfitLoss: potentialProfitLoss.toFixed(2),
        profitLossRate: profitLossRate.toFixed(2),
        annualLossProjection: annualLossProjection.toFixed(2),
    };
  };

  const kpis = calculateKPIs();

  // --- Lógica para Alertas de Vencimento (RF04) ---
  const today = new Date();
  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

  const expiryAlerts = products
    .filter(p => p.expiryDate)
    .map(p => ({
        ...p,
        expiryTime: new Date(p.expiryDate).getTime()
    }))
    .filter(p => {
        // Verifica se o produto tem data de vencimento no futuro
        if (p.expiryTime < today.getTime()) return false;
        
        // Verifica se está a 3 dias ou menos do vencimento
        return p.expiryTime - today.getTime() <= threeDaysInMs;
    })
    .sort((a, b) => a.expiryTime - b.expiryTime);


  // --- Lógica para Atividade Recente (RF02, RF05) ---
  // Últimos 5 produtos cadastrados (RF02)
  const recentProducts = [...products]
    .sort((a, b) => b.id - a.id) // Ordena por ID decrescente (mais recente primeiro)
    .slice(0, 5);

  // Últimos 5 registros de desperdício (RF05)
  const recentWaste = [...wasteRecords]
    .sort((a, b) => b.id - a.id) // Ordena por ID decrescente (mais recente primeiro)
    .slice(0, 5);
  
  return (
    <div className="dashboard-layout">
        <h2 className="dashboard-title">Painel Principal</h2>

        {/* Linha 1: Alertas e KPIs */}
        <div className="dashboard-row">
            
            {/* Bloco de Alertas de Vencimento (RF04) */}
            <div className="content-box alert-box">
                <h3 className="content-box-title">🚨 Alertas de Vencimento</h3>
                {expiryAlerts.length > 0 ? (
                    <ul className="alert-list">
                        {expiryAlerts.map(p => (
                            <li key={p.id} className="alert-item">
                                <strong>{p.name}</strong> vence em: {p.expiryDate}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-alert">Nenhum produto próximo do vencimento nos próximos 3 dias.</p>
                )}
            </div>

            {/* Bloco de KPIs (Atualizado com todos os KPIs) */}
            <div className="kpi-container">
                <div className="kpi-card">
                    <h4>Total de Produtos Cadastrados</h4>
                    <div className="kpi-value">{kpis.totalProducts}</div>
                </div>
                <div className="kpi-card">
                    <h4>Taxa de Desperdício</h4>
                    <div className="kpi-value loss">{kpis.wasteRate}%</div>
                </div>
                <div className="kpi-card">
                    <h4>Perda Financeira Total</h4>
                    <div className="kpi-value loss">R$ {kpis.totalFinancialLoss}</div>
                </div>
                <div className="kpi-card">
                    <h4>Lucro Potencial Total</h4>
                    <div className="kpi-value">R$ {kpis.totalPotentialProfit}</div>
                </div>
                <div className="kpi-card">
                    <h4>Taxa de Perda de Lucro</h4>
                    <div className="kpi-value loss">{kpis.profitLossRate}%</div>
                </div>
                <div className="kpi-card">
                    <h4>Projeção de Perda Anual</h4>
                    <div className="kpi-value loss">R$ {kpis.annualLossProjection}</div>
                </div>
            </div>
        </div>

        {/* Linha 2: Atividade Recente */}
        <div className="dashboard-row activity-row">
            
            {/* Atividade Recente: Produtos (RF02) */}
            <div className="content-box activity-box">
                <h3 className="content-box-title">Últimos Cadastros de Produtos </h3>
                <ul className="activity-list">
                    {recentProducts.map(p => (
                        <li key={p.id}>
                            <strong>{p.name}</strong> - Categoria: {p.category}
                        </li>
                    ))}
                    {recentProducts.length === 0 && <li>Nenhum produto cadastrado recentemente.</li>}
                </ul>
            </div>

            {/* Atividade Recente: Desperdício (RF05) */}
            <div className="content-box activity-box">
                <h3 className="content-box-title">Últimos Registros de Desperdício </h3>
                <ul className="activity-list">
                    {recentWaste.map(w => (
                        <li key={w.id}>
                            <strong>{w.productName}</strong> ({w.quantity} unidades) - Motivo: {w.reason}
                        </li>
                    ))}
                    {recentWaste.length === 0 && <li>Nenhum desperdício registrado recentemente.</li>}
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;