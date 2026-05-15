import {FiEye,FiTrash2,FiDollarSign,FiBarChart2 ,FiPackage } from 'react-icons/fi';

import './StockSorties1.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8000/api';

const StockSorties = () => {
  const [sorties, setSorties] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSortie, setSelectedSortie] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortiePerPage] = useState(10);
  const [stockAvailable, setStockAvailable] = useState(0);
  const [stockStatus, setStockStatus] = useState({ available: false, message: '' });
  const [formData, setFormData] = useState({
    num_bon_sortie: '',
    date_sortie: '',
    article_id: '',
    qantite_sortie: '',
    prix_sortie: '',
  });

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  const fetchSorties = async () => {
    try {
      setLoading(true);
      const response = await api.get('/sorties');
      setSorties(response.data);
    } catch (error) {
      console.log('Error fetching sorties:', error);
      toast.error('Failed to load sorties');
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchSorties();
    fetchArticles();
  }, []);

  const getArticleName = (articleId) => {
    const article = articles.find(a => a.id === articleId);
    return article ? article.designation : 'Loading...';
  };

  const getArticleStock = (articleId) => {
    const article = articles.find(a => a.id === articleId);
    return article ? article.quantite_en_stock_reel : 0;
  };

  const getArticleCode = (articleId) => {
    const article = articles.find(a => a.id === articleId);
    return article ? article.code_article : '';
  };

  // Vérifier le stock disponible quand l'article ou la quantité change
  useEffect(() => {
    if (formData.article_id && formData.qantite_sortie) {
      const stock = getArticleStock(parseInt(formData.article_id));
      const quantity = parseFloat(formData.qantite_sortie);
      setStockAvailable(stock);
      
      if (quantity > stock) {
        setStockStatus({ available: false, message: `⚠️ Stock insuffisant! Disponible: ${stock} units` });
      } else if (quantity === stock) {
        setStockStatus({ available: true, message: `⚡ Stock sera épuisé après cette sortie (${stock} units)` });
      } else if (quantity <= stock * 0.2) {
        setStockStatus({ available: true, message: `⚠️ Attention: Stock faible après sortie (${stock - quantity} units restants)` });
      } else {
        setStockStatus({ available: true, message: `✅ Stock suffisant. Restant: ${stock - quantity} units` });
      }
    } else if (formData.article_id) {
      const stock = getArticleStock(parseInt(formData.article_id));
      setStockAvailable(stock);
      setStockStatus({ available: true, message: `📦 Stock disponible: ${stock} units` });
    } else {
      setStockStatus({ available: false, message: '' });
    }
  }, [formData.article_id, formData.qantite_sortie]);

  const filteredSorties = sorties.filter(sort =>
    sort.num_bon_sortie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getArticleName(sort.article_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastSort = currentPage * sortiePerPage;
  const indexOfFirstSort = indexOfLastSort - sortiePerPage;
  const currentSorties = filteredSorties.slice(indexOfFirstSort, indexOfLastSort);
  const totalPages = Math.ceil(filteredSorties.length / sortiePerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      num_bon_sortie: '',
      date_sortie: '',
      article_id: '',
      qantite_sortie: '',
      prix_sortie: '',
    });
    setStockStatus({ available: false, message: '' });
    setStockAvailable(0);
  };

  const openAddModal = () => {
    setModalMode('add');
    resetForm();
    setIsModalOpen(true);
  };

  const openViewModal = (sortie) => {
    setModalMode('view');
    setSelectedSortie(sortie);
    setIsModalOpen(true);
  };

  const createSortie = async () => {
    // Vérification du stock avant envoi
    const stock = getArticleStock(parseInt(formData.article_id));
    const quantity = parseFloat(formData.qantite_sortie);
    
    if (quantity > stock) {
      toast.error(`Stock insuffisant! Quantité disponible: ${stock} units`);
      return;
    }

    try {
      const response = await api.post('/sorties', formData);
      toast.success('Stock sortie created successfully! Stock updated automatically.');
      fetchSorties();
      fetchArticles(); // Recharger les articles pour mettre à jour les stocks
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(err => {
          toast.error(err[0]);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to create sortie');
      }
    }
  };

  const deleteSortie = async () => {
    try {
      await api.delete(`/sorties/${deleteConfirm.id}`);
      toast.success('Exit deleted successfully');
      fetchSorties();
      fetchArticles(); // Recharger les articles pour mettre à jour les stocks
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  // Calculs pour les statistiques
  const totalSorties = sorties.length;
  const totalValueMTD = sorties.reduce((sum, sort) =>
    sum + (sort.qantite_sortie * sort.prix_sortie), 0
  );
 const totalQuantity = sorties.reduce((sum, sort) => {
  const quantity = parseFloat(sort.qantite_sortie) || 0;
  return sum + quantity;
}, 0);
  return (
    <div className="sorties-page">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="header-card">
        <div className="header-content">
          <div>
            <h1><FiBarChart2/> Stock Exits Management</h1>
            <p className="subtitle">Manage outgoing stock and warehouse exits efficiently.</p>
          </div>
          <button className="btn-primary" onClick={openAddModal}>
            + Add Exit
          </button>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search by exit number or article..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ justifyContent: 'center' }}>
        <div className="stat-card">
          <div>
            <p className="stat-label">Total Exits</p>
            <p className="stat-value">{totalSorties.toLocaleString()}</p>
          </div>
          <div className="stat-icon"><FiPackage/></div>
        </div>

        <div className="stat-card">
          <div>
            <p className="stat-label">Value MTD</p>
            <p className="stat-value">{totalValueMTD.toLocaleString()}</p>
          </div>
          <div className="stat-icon">DH</div>
        </div>

        <div className="stat-card">
          <div>
            <p className="stat-label">Total Quantity</p>
            <p className="stat-value">{totalQuantity.toLocaleString()} units</p>
          </div>
          <div className="stat-icon"><FiPackage/></div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="sorties-table">
          <thead>
            <tr>
              <th>NUM BON SORTIE</th>
              <th>DATE SORTIE</th>
              <th>ARTICLE</th>
              <th>QUANTITÉ SORTIE</th>
              <th>PRIX SORTIE</th>
              <th>VALEUR TOTALE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr key="loading">
                <td colSpan="7" className="loading-cell">
                  <div className="spinner"></div>
                </td>
              </tr>
            ) : currentSorties.length === 0 ? (
              <tr key="empty">
                <td colSpan="7" className="empty-cell">No exits found</td>
              </tr>
            ) : (
              currentSorties.map((sortie) => {
                const totalValue = sortie.qantite_sortie * sortie.prix_sortie;
                return (
                  <tr key={sortie.id}>
                    <td className="code-cell">{sortie.num_bon_sortie}</td>
                    <td>{new Date(sortie.date_sortie).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>{getArticleName(sortie.article_id)}</td>
                    <td>{sortie.qantite_sortie?.toLocaleString()} units</td>
                    <td>${parseFloat(sortie.prix_sortie || 0).toFixed(2)}</td>
                    <td className="total-cell">{totalValue.toLocaleString()}</td>
                    <td className="actions-cell">
                      <button className="action-btn view" onClick={() => openViewModal(sortie)}><FiEye size={18}/></button>
                      <button className="action-btn delete" onClick={() => setDeleteConfirm(sortie)}><FiTrash2 size={18}/></button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && filteredSorties.length > 0 && (
          <div className="pagination-container">
            <div className="table-footer">
              Showing {indexOfFirstSort + 1} to {Math.min(indexOfLastSort, filteredSorties.length)} of {filteredSorties.length} entries
            </div>
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-btn"
              >
                ← Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Add/View */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {modalMode === 'add' && 'Add New Stock Exit'}
                {modalMode === 'view' && 'Exit Details'}
              </h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              {modalMode === 'view' ? (
                <>
                  <div className="view-field">
                    <label>Num Bon Sortie</label>
                    <p>{selectedSortie?.num_bon_sortie}</p>
                  </div>
                  <div className="view-field">
                    <label>Date Sortie</label>
                    <p>{new Date(selectedSortie?.date_sortie).toLocaleDateString()}</p>
                  </div>
                  <div className="view-field">
                    <label>Article</label>
                    <p>{getArticleName(selectedSortie?.article_id)}</p>
                  </div>
                  <div className="view-field">
                    <label>Code Article</label>
                    <p>{getArticleCode(selectedSortie?.article_id)}</p>
                  </div>
                  <div className="view-field">
                    <label>Quantité Sortie</label>
                    <p>{selectedSortie?.qantite_sortie?.toLocaleString()} units</p>
                  </div>
                  <div className="view-field">
                    <label>Prix Sortie</label>
                    <p>${parseFloat(selectedSortie?.prix_sortie || 0).toFixed(2)}</p>
                  </div>
                  <div className="view-field">
                    <label>Valeur Totale</label>
                    <p className="total-field">
                      ${(selectedSortie?.qantite_sortie * selectedSortie?.prix_sortie).toLocaleString()}
                    </p>
                  </div>
                  <div className="view-field">
                    <label>Stock Restant</label>
                    <p className="stock-field">{getArticleStock(selectedSortie?.article_id)} units</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Num Bon Sortie *</label>
                    <input
                      type="text"
                      name="num_bon_sortie"
                      value={formData.num_bon_sortie}
                      onChange={handleInputChange}
                      placeholder="Ex: #BS-2024-001"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date Sortie *</label>
                    <input
                      type="date"
                      name="date_sortie"
                      value={formData.date_sortie}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Article *</label>
                    <select
                      name="article_id"
                      value={formData.article_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an article</option>
                      {articles.map(article => (
                        <option key={article.id} value={article.id}>
                          {article.code_article} - {article.designation} (Stock: {article.quantite_en_stock_reel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Quantité Sortie *</label>
                    <input
                      type="number"
                      name="qantite_sortie"
                      value={formData.qantite_sortie}
                      onChange={handleInputChange}
                      placeholder="Enter quantity"
                    />
                  </div>

                  <div className="form-group">
                    <label>Prix Sortie *</label>
                    <input
                      type="number"
                      step="0.01"
                      name="prix_sortie"
                      value={formData.prix_sortie}
                      onChange={handleInputChange}
                      placeholder="Enter price per unit"
                    />
                  </div>

                  {/* Stock Status Display */}
                  {stockStatus.message && (
                    <div className={`stock-status ${stockStatus.available ? 'available' : 'insufficient'}`}>
                      {stockStatus.message}
                    </div>
                  )}

                  {formData.qantite_sortie && formData.prix_sortie && (
                    <div className="preview-total">
                      <label>Valeur Totale:</label>
                      <p>${(parseFloat(formData.qantite_sortie) * parseFloat(formData.prix_sortie)).toLocaleString()}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="modal-footer">
              {modalMode === 'add' && (
                <>
                  <button 
                    className="btn-submit" 
                    onClick={createSortie}
                    disabled={!stockStatus.available && formData.qantite_sortie > 0}
                  >
                    Create Exit
                  </button>
                  <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                </>
              )}
              {modalMode === 'view' && (
                <button className="btn-submit" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h2>Delete Exit</h2>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete exit <strong>"{deleteConfirm.num_bon_sortie}"</strong>?</p>
              <p>This will increase the article stock back.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-delete" onClick={deleteSortie}>Delete</button>
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSorties;