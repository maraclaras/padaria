import React, { useState } from 'react';
import Login from './components/Login.jsx';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import WasteForm from './components/WasteForm.jsx'; // Importar novo componente
import ReportDashboard from './components/ReportDashboard.jsx'; // Importar novo componente
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [wasteRecords, setWasteRecords] = useState([]); // Novo estado para desperdício

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

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <header>
            <h1>Gerenciamento de Produtos</h1>
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          </header>
          <div className="main-content">
            <ProductForm onAddProduct={handleAddProduct} />
            <ProductList products={products} />
            <WasteForm products={products} onRegisterWaste={handleRegisterWaste} />
            <ReportDashboard products={products} wasteRecords={wasteRecords} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;