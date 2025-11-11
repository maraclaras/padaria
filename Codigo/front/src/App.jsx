import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import WasteForm from './components/WasteForm.jsx';
import ReportDashboard from './components/ReportDashboard.jsx';
import EditProductForm from './components/EditProductForm.jsx';
import './App.css'; 

// --- Componentes de Gerenciamento ---

const ProductsManagement = ({ products, onAddProduct, onDeleteProduct }) => (
  <>
    <div className="column-left">
      <ProductForm onAddProduct={onAddProduct} />
    </div>
    <div className="column-right">
      {/* Passa a nova prop onDeleteProduct */}
      <ProductList products={products} onDeleteProduct={onDeleteProduct} />
    </div>
  </>
);

const WasteManagement = ({ products, wasteRecords, onRegisterWaste, onDeleteWaste }) => (
  <>
    <div className="column-left">
      <WasteForm products={products} onRegisterWaste={onRegisterWaste} />
    </div>
    <div className="column-right">
      {/* Passa a nova prop onDeleteWaste para ReportDashboard */}
      <ReportDashboard wasteRecords={wasteRecords} products={products} onDeleteWaste={onDeleteWaste} />
    </div>
  </>
);

// --- Componente de Proteção de Rotas ---
function RequireAuth({ isLoggedIn, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([
    {id: 1, name: 'Pão Francês', category: 'Pães', costPrice: 0.50, salePrice: 1.00, expiryDate: '2025-10-01'},
    {id: 2, name: 'Bolo de Chocolate', category: 'Bolos', costPrice: 15.00, salePrice: 25.00, expiryDate: '2025-10-05'},
    {id: 3, name: 'Sonho', category: 'Doces', costPrice: 1.20, salePrice: 3.50, expiryDate: '2025-09-28'},
  ]);
  const [wasteRecords, setWasteRecords] = useState([
    {productName: 'Pão Francês', quantity: 10, reason: 'Queimado', costPrice: 0.50, id: 1},
    {productName: 'Bolo de Chocolate', quantity: 1, reason: 'Vencimento', costPrice: 15.00, id: 2},
    {productName: 'Sonho', quantity: 5, reason: 'Estragado', costPrice: 1.20, id: 3},
  ]);

  // --- Novas Funções de Exclusão ---
  
  const handleDeleteProduct = (productId) => {
      if (window.confirm('Tem certeza que deseja excluir este produto?')) {
          setProducts(products.filter(p => p.id !== productId));
      }
  };

  const handleDeleteWaste = (wasteId) => {
      if (window.confirm('Tem certeza que deseja excluir este registro de desperdício?')) {
          setWasteRecords(wasteRecords.filter(w => w.id !== wasteId));
      }
  };

  // ---------------------------------
  
  const handleLogin = (username, password) => {
    if (username === 'padariaReal' && password === '123456') {
      setIsLoggedIn(true);
      
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAddProduct = (newProduct) => {
    const productToAdd = { 
      ...newProduct, 
      id: products.length + 1,
      costPrice: parseFloat(newProduct.costPrice),
      salePrice: parseFloat(newProduct.salePrice),
    };
    setProducts([...products, productToAdd]);
  };

  const handleRegisterWaste = (newWaste) => {
    const wasteToRegister = {
      ...newWaste,
      quantity: parseInt(newWaste.quantity),
      // Atribui um ID único (baseado no tamanho do array atual + 1)
      id: wasteRecords.length + 1
    };
    setWasteRecords([...wasteRecords, wasteToRegister]);
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === parseInt(updatedProduct.id) ? { 
        ...updatedProduct,
        costPrice: parseFloat(updatedProduct.costPrice),
        salePrice: parseFloat(updatedProduct.salePrice)
      } : p
    ));
    navigate('/'); 
  };
  
  const getNavLinkClass = (path) => {
    const currentPath = window.location.pathname;
    if (path === '/') return currentPath === '/' ? 'active' : '';
    return currentPath.startsWith(path) ? 'active' : '';
  };
  
  return (
    <div className="App">
      {isLoggedIn && (
        <header className="app-header">
          <div className="header-left">
            <h1 className="app-title">Gerenciamento de Produtos</h1>
            <nav className="nav-menu">
              <Link to="/">
                <button 
                  className={`nav-button ${getNavLinkClass('/')}`}
                >
                  Produtos
                </button>
              </Link>
              <Link to="/desperdicio">
                <button 
                  className={`nav-button ${getNavLinkClass('/desperdicio')}`}
                >
                  Desperdício
                </button>
              </Link>
            </nav>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </header>
      )}
      
      <main className={isLoggedIn ? "main-dashboard" : ""}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Rotas Protegidas (passa as novas funções de exclusão) */}
          <Route path="/" element={<RequireAuth isLoggedIn={isLoggedIn}>
            <ProductsManagement 
              products={products} 
              onAddProduct={handleAddProduct} 
              onDeleteProduct={handleDeleteProduct}
            />
          </RequireAuth>} />
          
          <Route path="/desperdicio" element={<RequireAuth isLoggedIn={isLoggedIn}>
            <WasteManagement 
              products={products} 
              wasteRecords={wasteRecords} 
              onRegisterWaste={handleRegisterWaste} 
              onDeleteWaste={handleDeleteWaste}
            />
          </RequireAuth>} />
          
          <Route path="/edit/:productId" element={<RequireAuth isLoggedIn={isLoggedIn}><EditProductForm products={products} onSave={handleSaveProduct} /></RequireAuth>} />

          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;