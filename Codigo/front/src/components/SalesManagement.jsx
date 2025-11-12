import React, { useState } from 'react';
import SalesTable from './SalesTable';
import SalesFormModal from './SalesFormModal';
import { Plus } from 'lucide-react';

function SalesManagement({ salesRecords, onAddSale, onDeleteSale, onUpdateSale }) {
    const [showSalesModal, setShowSalesModal] = useState(false);
    const [editingSale, setEditingSale] = useState(null);

    const handleEditSale = (record) => {
        setEditingSale(record);
    };

    const handleUpdateSaleWrapper = (id, data) => {
        onUpdateSale(id, data);
        setEditingSale(null);
    };

    return (
        <div className="dashboard-page-layout">
            <div className="column-left">
                <div className="content-box">
                    <h2 className="content-box-title">Cadastrar Venda</h2>
                    <button 
                        onClick={() => setShowSalesModal(true)}
                        className="primary-button"
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center', width: '100%' }}
                    >
                        <Plus size={18} />
                        Cadastrar Venda
                    </button>
                </div>
            </div>
            <div className="column-right">
                <div className="content-box">
                    <h2 className="content-box-title">Registros de Vendas</h2>
                    <SalesTable 
                        records={salesRecords} 
                        onDelete={onDeleteSale}
                        onEdit={handleEditSale}
                    />
                </div>
            </div>

            {/* Modals */}
            {showSalesModal && (
                <SalesFormModal 
                    onClose={() => setShowSalesModal(false)}
                    onSubmit={onAddSale}
                />
            )}
            {editingSale && (
                <SalesFormModal 
                    onClose={() => setEditingSale(null)}
                    onSubmit={(data) => handleUpdateSaleWrapper(editingSale.id, data)}
                    initialData={editingSale}
                    isEditing
                />
            )}
        </div>
    );
}

export default SalesManagement;
