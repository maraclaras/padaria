import React, { useState } from 'react';
import Login from './components/Login.jsx';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import WasteForm from './components/WasteForm.jsx';
import ReportDashboard from './components/ReportDashboard.jsx';
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeView, setActiveView] = useState('produtos'); // Estado para controlar a aba ativa

  const [products, setProducts] = useState([
    {id: 1, name: '[Dado]', category: '[Dado]', costPrice: '[Dado]', salePrice: '[Dado]', expiryDate: '[Dado]'},
    {id: 2, name: '[Dado]', category: '[Dado]', costPrice: '[Dado]', salePrice: '[Dado]', expiryDate: '[Dado]'},
    {id: 3, name: '[Dado]', category: '[Dado]', costPrice: '[Dado]', salePrice: '[Dado]', expiryDate: '[Dado]'},
  ]);
  const [wasteRecords, setWasteRecords] = useState([
    {productName: '[Dado]', quantity: '[Dado]', reason: '[Dado]', costPrice: 0},
    {productName: '[Dado]', quantity: '[Dado]', reason: '[Dado]', costPrice: 0},
    {productName: '[Dado]', quantity: '[Dado]', reason: '[Dado]', costPrice: 0},
  ]);

  const handleLogin = (username, password) => {
    if (username === 'padariaReal' && password === '12345') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  const handleRegisterWaste = (newWaste) => {
    setWasteRecords([...wasteRecords, newWaste]);
  };

  const renderProductsView = () => (
    <>
      <div className="column-left">
        <ProductForm onAddProduct={handleAddProduct} />
      </div>
      <div className="column-right">
        <ProductList products={products} />
      </div>
    </>
  );

  const renderWasteView = () => (
    <>
      <div className="column-left">
        <WasteForm products={products} onRegisterWaste={handleRegisterWaste} />
      </div>
      <div className="column-right">
        <ReportDashboard wasteRecords={wasteRecords} />
      </div>
    </>
  );

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <header className="app-header">
            <div className="header-left">
              <h1 className="app-title">Gerenciamento de Produtos</h1>
              <nav className="nav-menu">
                <button 
                  className={`nav-button ${activeView === 'produtos' ? 'active' : ''}`}
                  onClick={() => setActiveView('produtos')}>
                  Produtos
                </button>
                <button 
                  className={`nav-button ${activeView === 'desperdicio' ? 'active' : ''}`}
                  onClick={() => setActiveView('desperdicio')}>
                  Desperdício
                </button>
              </nav>
            </div>
            <button className="logout-button" onClick={() => setIsLoggedIn(false)}>Logout</button>
          </header>
          
          <main className="main-dashboard">
            {activeView === 'produtos' ? renderProductsView() : renderWasteView()}
          </main>
        </>
      )}
    </div>
  );
}

export default App;