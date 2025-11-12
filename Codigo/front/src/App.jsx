// import React, { useState } from 'react';
// import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
// import Login from './components/Login.jsx';
// import Dashboard from './components/Dashboard.jsx'; 
// import ProductList from './components/ProductList.jsx';
// import ProductForm from './components/ProductForm.jsx';
// import WasteForm from './components/WasteForm.jsx';
// import ReportDashboard from './components/ReportDashboard.jsx';
// import SalesManagement from './components/SalesManagement.jsx'; // NOVO: Importa o componente de Vendas
// import EditProductForm from './components/EditProductForm.jsx';
// import CategoryManagement from './components/CategoryManagement.jsx';
// import AdvancedProductList from './components/AdvancedProductList.jsx'; 
// import UserManagement from './components/UserManagement.jsx'; // NOVO: Importa o componente
// import './App.css'; 
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

// --- Imports Corrigidos e Organizados ---
import Login from './components/auth/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ReportDashboard from './components/dashboard/ReportDashboard.jsx';

// Components de Formulários (forms)
import ProductForm from './components/forms/ProductForm.jsx';
import WasteForm from './components/forms/WasteForm.jsx';
import EditProductForm from './components/forms/EditProductForm.jsx'; // CORRIGIDO O CAMINHO AQUI!

// Components de Produtos (products)
import ProductList from './components/products/ProductList.jsx';
import AdvancedProductList from './components/products/AdvancedProductList.jsx'; 

// Components de Gerenciamento (management)
import CategoryManagement from './components/management/CategoryManagement.jsx';
import UserManagement from './components/management/UserManagement.jsx';

import './App.css'; 

// --- Componentes de Gerenciamento (inalterados) ---
const ProductsManagement = ({ products, categories, onAddProduct, onDeleteProduct }) => (
  <>
    <div className="column-left">
      <ProductForm onAddProduct={onAddProduct} categories={categories} />
    </div>
    <div className="column-right">
      <div className="content-box"> 
        <h2 className="content-box-title">Lista Rápida de Produtos</h2>
        <ProductList products={products} onDeleteProduct={onDeleteProduct} />
      </div>
    </div>
  </>
);

  const WasteManagement = ({ products, wasteRecords, onDeleteWaste, onRegisterWaste }) => (
  // Componente simplificado: apenas formulário e listagem de desperdício
  <>
    <div className="column-left">
      <WasteForm products={products} onRegisterWaste={onRegisterWaste} />
    </div>
    <div className="column-right">
      <div className="content-box"> 
        <h2 className="content-box-title">Registros de Desperdício</h2>
        {/* Usando o ReportDashboard para listar apenas o desperdício, mas sem os KPIs */}
        <ReportDashboard wasteRecords={wasteRecords} products={products} onDeleteWaste={onDeleteWaste} simpleView={true} />
      </div>
    </div>
  </>
);


// --- Componente de Proteção de Rotas (inalterado) ---
function RequireAuth({ isLoggedIn, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // NOVO ESTADO: Usuários e Credenciais (Para simular segurança)
  const [users, setUsers] = useState([
    // Usuário padrão hardcoded
    { id: 1, username: 'padariaReal', password: '123456', isActive: true },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // --- Estados de Dados (Atualizado com Vendas) ---
  const [products, setProducts] = useState([
    {id: 1, name: 'Pão Francês', category: 'Pães', costPrice: 0.50, salePrice: 1.00, expiryDate: '2025-10-01'},
    {id: 2, name: 'Bolo de Chocolate', category: 'Bolos', costPrice: 15.00, salePrice: 25.00, expiryDate: '2025-10-05'},
    {id: 3, name: 'Sonho', category: 'Doces', costPrice: 1.20, salePrice: 3.50, expiryDate: '2025-09-28'},
    {id: 4, name: 'Pão Integral', category: 'Pães', costPrice: 2.00, salePrice: 5.00, expiryDate: '2025-10-06'},
  ]);
  const [wasteRecords, setWasteRecords] = useState([
    {productName: 'Pão Francês', quantity: 10, reason: 'Queimado', costPrice: 0.50, id: 1},
    {productName: 'Bolo de Chocolate', quantity: 1, reason: 'Vencimento', costPrice: 15.00, id: 2},
    {productName: 'Sonho', quantity: 5, reason: 'Estragado', costPrice: 1.20, id: 3},
  ]);
  const [salesRecords, setSalesRecords] = useState([
    {id: 1, date: '2025-11-01', productName: 'Pão Francês', quantity: 50, costPrice: 0.50, salePrice: 1.00, revenue: 50.00, profit: 25.00},
    {id: 2, date: '2025-11-01', productName: 'Bolo de Chocolate', quantity: 2, costPrice: 15.00, salePrice: 25.00, revenue: 50.00, profit: 20.00},
  ]);
  const [categories, setCategories] = useState([
      { id: 1, name: 'Pães' },
      { id: 2, name: 'Bolos' },
      { id: 3, name: 'Doces' },
      { id: 4, name: 'Salgados' },
  ]);


  // --- Funções CRUD de Usuários ---

  const findUserByUsername = (username) => users.find(u => u.username === username);

  const handleAddUser = (newUserData) => {
    const newUser = {
        ...newUserData,
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        isActive: true,
    };
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = (id, updatedData) => {
    setUsers(users.map(u => 
        u.id === id ? { 
            ...u, 
            username: updatedData.username,
            // Atualiza a senha APENAS se uma nova for fornecida
            password: updatedData.password ? updatedData.password : u.password,
            isActive: updatedData.isActive,
        } : u
    ));
  };
  
  const handleResetPassword = (id, newPassword) => {
      setUsers(users.map(u => 
        u.id === id ? { ...u, password: newPassword } : u
      ));
  };

  const handleDeleteUser = (id) => {
      // Função "delete" usada para Ativar/Desativar
      setUsers(users.map(u => 
        u.id === id ? { ...u, isActive: !u.isActive } : u
      ));
      // Se o usuário desativado for o atualmente logado, força logout (Lógica simples)
      const currentUser = findUserByUsername(localStorage.getItem('loggedUsername'));
      if (currentUser && currentUser.id === id && !currentUser.isActive) {
          handleLogout();
      }
  };

  // --- Funções de Login/State ---
  
  const handleLogin = (username, password) => {
    const user = findUserByUsername(username);
    
    if (user && user.password === password && user.isActive) {
      setIsLoggedIn(true);
      // Salva o username para checar se é o próprio ao desativar
      localStorage.setItem('loggedUsername', username); 
      
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedUsername');
    navigate('/login');
  };
  
  // --- Funções CRUD de Produtos/Desperdício/Categorias (inalteradas, simplificadas aqui) ---
  
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

  // --- Funções CRUD de Vendas (NOVO) ---

  const handleAddSale = (newSale) => {
    const revenue = newSale.quantity * newSale.salePrice;
    const profit = revenue - (newSale.quantity * newSale.costPrice);
    const saleToRegister = {
      ...newSale,
      id: salesRecords.length > 0 ? salesRecords[salesRecords.length - 1].id + 1 : 1,
      revenue: parseFloat(revenue.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
    };
    setSalesRecords([...salesRecords, saleToRegister]);
  };

  const handleDeleteSale = (saleId) => {
      if (window.confirm('Tem certeza que deseja excluir este registro de venda?')) {
          setSalesRecords(salesRecords.filter(s => s.id !== saleId));
      }
  };

  const handleUpdateSale = (id, updatedData) => {
    const revenue = updatedData.quantity * updatedData.salePrice;
    const profit = revenue - (updatedData.quantity * updatedData.costPrice);
    setSalesRecords(salesRecords.map(s => 
      s.id === id ? { 
        ...updatedData, 
        id, 
        revenue: parseFloat(revenue.toFixed(2)), 
        profit: parseFloat(profit.toFixed(2)) 
      } : s
    ));
  };
  
  const handleAddCategory = (name) => {
      const newCategory = { id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1, name };
      setCategories([...categories, newCategory]);
  };

  const handleUpdateCategory = (id, newName) => {
      setCategories(categories.map(c => 
          c.id === id ? { ...c, name: newName } : c
      ));

      const oldCategoryName = categories.find(c => c.id === id)?.name;

      setProducts(products.map(p => 
          p.category === oldCategoryName ? { ...p, category: newName } : p
      ));
  };

  const handleDeleteCategory = (id) => {
      setCategories(categories.filter(c => c.id !== id));
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
    navigate('/produtos'); 
  };
  
  // --- Lógica de View (inalterada) ---
  const getNavLinkClass = (path) => {
    const currentPath = location.pathname;
    if (path === '/') return currentPath === '/' ? 'active' : '';
    return currentPath.startsWith(path) ? 'active' : '';
  };
  
  const isDashboard = location.pathname === '/';

  const mainClassName = isLoggedIn 
    ? `main-dashboard ${isDashboard ? 'dashboard-page-layout' : ''}` 
    : '';

  // ------------------------------------------------------------------------

  return (
    <div className="App">
      {isLoggedIn && (
        <header className="app-header">
          <div className="header-left">
            <h1 className="app-title">Gerenciamento de Produtos</h1>
            <nav className="nav-menu">
              <Link to="/"><button className={`nav-button ${getNavLinkClass('/')}`}>Dashboard</button></Link>
              <Link to="/consulta"><button className={`nav-button ${getNavLinkClass('/consulta')}`}>Consulta</button></Link>
              <Link to="/produtos"><button className={`nav-button ${getNavLinkClass('/produtos')}`}>Cadastro/Lista</button></Link>
              <Link to="/vendas"><button className={`nav-button ${getNavLinkClass('/vendas')}`}>Vendas</button></Link>
              <Link to="/desperdicio"><button className={`nav-button ${getNavLinkClass('/desperdicio')}`}>Desperdício</button></Link>
              <Link to="/categorias"><button className={`nav-button ${getNavLinkClass('/categorias')}`}>Categorias</button></Link>
              {/* NOVO: Botão para Gerenciamento de Usuários */}
              <Link to="/usuarios"><button className={`nav-button ${getNavLinkClass('/usuarios')}`}>Usuários</button></Link> 
            </nav>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </header>
      )}
      
      <main className={mainClassName}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          <Route path="/" element={<RequireAuth isLoggedIn={isLoggedIn}>
            <Dashboard 
              products={products} 
              wasteRecords={wasteRecords} 
              salesRecords={salesRecords}
            />
          </RequireAuth>} />
          
          {/* Rotas restantes (consulta, produtos, desperdicio, categorias, edição) */}
          <Route path="/consulta" element={<RequireAuth isLoggedIn={isLoggedIn}>
            <AdvancedProductList products={products} categories={categories} onDeleteProduct={handleDeleteProduct} />
          </RequireAuth>} />
          
          <Route path="/produtos" element={<RequireAuth isLoggedIn={isLoggedIn}>
            <ProductsManagement products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} categories={categories} />
          </RequireAuth>} />
          
          <Route path="/vendas" element={<RequireAuth isLoggedIn={isLoggedIn}>
            <SalesManagement 
              salesRecords={salesRecords}
              onAddSale={handleAddSale}
              onDeleteSale={handleDeleteSale}
              onUpdateSale={handleUpdateSale}
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
          
          <Route path="/categorias" element={<RequireAuth isLoggedIn={isLoggedIn}>
              <CategoryManagement categories={categories} products={products} onAddCategory={handleAddCategory} onUpdateCategory={handleUpdateCategory} onDeleteCategory={handleDeleteCategory}/>
          </RequireAuth>} />

          {/* NOVA ROTA: Gerenciamento de Usuários */}
          <Route path="/usuarios" element={<RequireAuth isLoggedIn={isLoggedIn}>
            <UserManagement 
                users={users}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
                onResetPassword={handleResetPassword}
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