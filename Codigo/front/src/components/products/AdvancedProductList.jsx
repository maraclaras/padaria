import React, { useState, useMemo } from 'react';
import ProductList from './ProductList.jsx'; // Importa o componente de listagem simples

// Componente para a barra de filtros
function FilterBar({ filters, setFilters, categories }) {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      category: '',
      minCost: '',
      maxCost: '',
      minSale: '',
      maxSale: '',
      minExpiry: '',
      maxExpiry: '',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  return (
    <div className="content-box filter-bar">
      <h3 className="content-box-title">Filtros Avançados</h3>
      <div className="filter-grid">
        <input type="text" name="name" placeholder="Nome do Produto" value={filters.name} onChange={handleChange} />
        
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">Todas as Categorias</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>

        <input type="number" name="minCost" placeholder="Custo Mín." value={filters.minCost} onChange={handleChange} />
        <input type="number" name="maxCost" placeholder="Custo Máx." value={filters.maxCost} onChange={handleChange} />

        <input type="number" name="minSale" placeholder="Venda Mín." value={filters.minSale} onChange={handleChange} />
        <input type="number" name="maxSale" placeholder="Venda Máx." value={filters.maxSale} onChange={handleChange} />
        
        <label>Vencimento De:</label>
        <input type="date" name="minExpiry" value={filters.minExpiry} onChange={handleChange} />
        <label>Vencimento Até:</label>
        <input type="date" name="maxExpiry" value={filters.maxExpiry} onChange={handleChange} />
      </div>

      <div className="sort-controls">
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="name">Ordenar por Nome</option>
          <option value="costPrice">Ordenar por Custo</option>
          <option value="salePrice">Ordenar por Venda</option>
          <option value="expiryDate">Ordenar por Vencimento</option>
        </select>

        <select name="sortOrder" value={filters.sortOrder} onChange={handleChange}>
          <option value="asc">Crescente (ASC)</option>
          <option value="desc">Decrescente (DESC)</option>
        </select>
        
        <button className="clear-button" onClick={handleClearFilters}>Limpar Filtros</button>
      </div>
    </div>
  );
}


function AdvancedProductList({ products, categories, onDeleteProduct }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minCost: '',
    maxCost: '',
    minSale: '',
    maxSale: '',
    minExpiry: '',
    maxExpiry: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  // --- Lógica de Filtragem e Ordenação (Usa useMemo para Performance RNF04) ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // 1. FILTRAGEM
    result = result.filter(product => {
      // Filtro por Nome
      if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      
      // Filtro por Categoria
      if (filters.category && product.category !== filters.category) return false;

      // Filtro por Preço de Custo
      const cost = parseFloat(product.costPrice);
      if (filters.minCost !== '' && cost < filters.minCost) return false;
      if (filters.maxCost !== '' && cost > filters.maxCost) return false;

      // Filtro por Preço de Venda
      const sale = parseFloat(product.salePrice);
      if (filters.minSale !== '' && sale < filters.minSale) return false;
      if (filters.maxSale !== '' && sale > filters.maxSale) return false;
      
      // Filtro por Data de Vencimento (RF04)
      const expiry = product.expiryDate;
      if (filters.minExpiry && expiry < filters.minExpiry) return false;
      if (filters.maxExpiry && expiry > filters.maxExpiry) return false;

      return true;
    });

    // 2. ORDENAÇÃO
    result.sort((a, b) => {
      let comparison = 0;
      const sortBy = filters.sortBy;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'expiryDate') {
        comparison = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      } else if (sortBy === 'costPrice' || sortBy === 'salePrice') {
        comparison = parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
      }

      return filters.sortOrder === 'asc' ? comparison : comparison * -1;
    });

    return result;
  }, [products, filters]);

  // --- Lógica de Paginação (RNF04, RNF06) ---
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <div className="advanced-list-container">
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        categories={categories} 
      />

      <div className="content-box product-list-results">
        <h2 className="content-box-title">Resultados ({filteredAndSortedProducts.length} Produtos)</h2>
        
        <ProductList products={paginatedProducts} onDeleteProduct={onDeleteProduct} />

        {/* Controles de Paginação */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedProductList;