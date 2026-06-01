import { FiEye, FiTrash2, FiEdit2, FiBarChart2, FiPackage, FiSearch } from 'react-icons/fi';
import './StockSorties1.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaBan, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaBoxes } from "react-icons/fa";
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

  // Vérification du stock
  useEffect(() => {
    if (formData.article_id && formData.qantite_sortie) {
      const stock = getArticleStock(parseInt(formData.article_id));
      const quantity = parseFloat(formData.qantite_sortie);
      
     if (quantity > stock) {
  setStockStatus({ 
    available: false, 
    message: <><FaBan className="text-red-500 inline mr-1" /> Stock insuffisant! Disponible: {stock} unités</>
  });
} else if (quantity === stock) {
  setStockStatus({ 
    available: true, 
    message: <><FaExclamationTriangle className="text-yellow-500 inline mr-1" /> Stock sera épuisé après cette sortie ({stock} unités)</>
  });
} else if (stock - quantity <= stock * 0.2) {
  setStockStatus({ 
    available: true, 
    message: <><FaExclamationTriangle className="text-orange-500 inline mr-1" /> Attention: Stock faible après sortie ({stock - quantity} unités restants)</>
  });
} else {
  setStockStatus({ 
    available: true, 
    message: <><FaCheckCircle className="text-green-500 inline mr-1" /> Stock suffisant. Restant: {stock - quantity} unités</>
  });
}
} else if (formData.article_id) {
  const stock = getArticleStock(parseInt(formData.article_id));
  setStockStatus({ 
    available: true, 
    message: <><FaInfoCircle className="text-blue-500 inline mr-1" /> Stock disponible: {stock} unités</>
  });
} else {
  setStockStatus({ available: false, message: '' });
}
}, [formData.article_id, formData.qantite_sortie, articles]);  // ← Ajoute cette ligne

  // Filtrage et pagination
  const filteredSorties = sorties.filter(sort =>
    sort.num_bon_sortie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getArticleName(sort.article_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const openEditModal = (sortie) => {
    setModalMode('edit');
    setSelectedSortie(sortie);
    setFormData({
      num_bon_sortie: sortie.num_bon_sortie,
      date_sortie: sortie.date_sortie.split('T')[0],
      article_id: sortie.article_id,
      qantite_sortie: sortie.qantite_sortie,
      prix_sortie: sortie.prix_sortie,
    });
    setIsModalOpen(true);
  };

  const createSortie = async () => {
    const stock = getArticleStock(parseInt(formData.article_id));
    const quantity = parseInt(formData.qantite_sortie);
    
    if (quantity > stock) {
      toast.error(`Stock insuffisant! Quantité disponible: ${stock} units`);
      return;
    }

    const dataToSend = {
      num_bon_sortie: formData.num_bon_sortie,
      date_sortie: formData.date_sortie,
      article_id: parseInt(formData.article_id),
      qantite_sortie: parseInt(formData.qantite_sortie),
      prix_sortie: parseFloat(formData.prix_sortie)
    };

    try {
      await api.post('/sorties', dataToSend);
      toast.success('Sortie créée avec succès!');
      fetchSorties();
      fetchArticles();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erreur lors de la création');
      }
    }
  };

  const updateSortie = async () => {
    const stock = getArticleStock(parseInt(formData.article_id));
    const quantity = parseInt(formData.qantite_sortie);
    
    if (quantity > stock) {
      toast.error(`Stock insuffisant! Quantité disponible: ${stock} units`);
      return;
    }

    const dataToSend = {
      num_bon_sortie: formData.num_bon_sortie,
      date_sortie: formData.date_sortie,
      article_id: parseInt(formData.article_id),
      qantite_sortie: parseInt(formData.qantite_sortie),
      prix_sortie: parseFloat(formData.prix_sortie)
    };

    try {
      await api.put(`/sorties/${selectedSortie.id}`, dataToSend);
      toast.success('Sortie modifiée avec succès!');
      fetchSorties();
      fetchArticles();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erreur lors de la modification');
      }
    }
  };

  const deleteSortie = async () => {
    try {
      await api.delete(`/sorties/${deleteConfirm.id}`);
      toast.success('Sortie supprimée avec succès');
      fetchSorties();
      fetchArticles();
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Statistiques
  const totalSorties = sorties.length;
  const totalValueMTD = sorties.reduce((sum, sort) => sum + (sort.qantite_sortie * sort.prix_sortie), 0);
  const totalQuantity = sorties.reduce((sum, sort) => sum + (parseFloat(sort.qantite_sortie) || 0), 0);

  return (
    <div className="sorties-page">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="header-card">
        <div className="header-content">
          <div>
            <h1><FiBarChart2 /> Stock Exits Management</h1>
            <p className="subtitle">Manage outgoing stock and warehouse exits efficiently.</p>
          </div>
          <button className="btn-primary" onClick={openAddModal}>
            + Add Exit
          </button>
        </div>

        {/* Search */}
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
          <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#888", pointerEvents: "none" }}>
            <FiSearch size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by exit number or article..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              padding: "10px 10px 10px 36px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
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
          <div className="stat-icon"><FiPackage /></div>
        </div>

        <div className="stat-card">
          <div>
            <p className="stat-label">Value MTD</p>
            <p className="stat-value">{totalValueMTD.toLocaleString()} </p>
          </div>
          <div className="stat-icon">DH</div>
        </div>

        <div className="stat-card">
          <div>
            <p className="stat-label">Total Quantity</p>
            <p className="stat-value">{totalQuantity.toLocaleString()} units</p>
          </div>
          <div className="stat-icon"><FiPackage /></div>
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
              <tr>
                <td colSpan="7" className="loading-cell">
                  <div className="spinner"></div>
                </td>
              </tr>
            ) : currentSorties.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-cell">No exits found</td>
              </tr>
            ) : (
              currentSorties.map((sortie) => {
                const totalValue = sortie.qantite_sortie * sortie.prix_sortie;
                return (
                  <tr key={sortie.id}>
                    <td className="code-cell">{sortie.num_bon_sortie}</td>
                    <td>{new Date(sortie.date_sortie).toLocaleDateString('fr-FR')}</td>
                    <td>{getArticleName(sortie.article_id)}</td>
                    <td>{sortie.qantite_sortie?.toLocaleString()} units</td>
                    <td>{parseFloat(sortie.prix_sortie || 0).toFixed(2)} DH</td>
                    <td className="total-cell">{totalValue.toLocaleString()} DH</td>
                    <td className="actions-cell">
                      <button className="action-btn view" onClick={() => openViewModal(sortie)}>
                        <FiEye size={18} />
                      </button>
                      <button className="action-btn edit" onClick={() => openEditModal(sortie)}>
                        <FiEdit2 size={18} />
                      </button>
                      <button className="action-btn delete" onClick={() => setDeleteConfirm(sortie)}>
                        <FiTrash2 size={18} />
                      </button>
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
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-btn">
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
              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="page-btn">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Add/Edit/View */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {modalMode === 'add' && 'Add New Stock Exit'}
                {modalMode === 'edit' && 'Edit Stock Exit'}
                {modalMode === 'view' && 'Exit Details'}
              </h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              {modalMode === 'view' ? (
                <>
                  <div className="view-field"><label>Num Bon Sortie</label><p>{selectedSortie?.num_bon_sortie}</p></div>
                  <div className="view-field"><label>Date Sortie</label><p>{new Date(selectedSortie?.date_sortie).toLocaleDateString()}</p></div>
                  <div className="view-field"><label>Article</label><p>{getArticleName(selectedSortie?.article_id)}</p></div>
                  <div className="view-field"><label>Code Article</label><p>{getArticleCode(selectedSortie?.article_id)}</p></div>
                  <div className="view-field"><label>Quantité Sortie</label><p>{selectedSortie?.qantite_sortie?.toLocaleString()} units</p></div>
                  <div className="view-field"><label>Prix Sortie</label><p>{parseFloat(selectedSortie?.prix_sortie || 0).toFixed(2)} DH</p></div>
                  <div className="view-field"><label>Valeur Totale</label><p className="total-field">{(selectedSortie?.qantite_sortie * selectedSortie?.prix_sortie).toLocaleString()} DH</p></div>
                  <div className="view-field"><label>Stock Restant</label><p className="stock-field">{getArticleStock(selectedSortie?.article_id)} units</p></div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Num Bon Sortie *</label>
                    <input type="text" name="num_bon_sortie" value={formData.num_bon_sortie} onChange={handleInputChange} placeholder="Ex: #BS-2024-001" />
                  </div>

                  <div className="form-group">
                    <label>Date Sortie *</label>
                    <input type="date" name="date_sortie" value={formData.date_sortie} onChange={handleInputChange} />
                  </div>

                  <div className="form-group">
                    <label>Article *</label>
                    <select name="article_id" value={formData.article_id} onChange={handleInputChange}>
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
                    <input type="number" name="qantite_sortie" value={formData.qantite_sortie} onChange={handleInputChange} placeholder="Enter quantity" />
                  </div>

                  <div className="form-group">
                    <label>Prix Sortie *</label>
                    <input type="number" step="0.01" name="prix_sortie" value={formData.prix_sortie} onChange={handleInputChange} placeholder="Enter price per unit" />
                  </div>

                  {stockStatus.message && (
                    <div className={`stock-status ${stockStatus.available ? 'available' : 'insufficient'}`}>
                      {stockStatus.message}
                    </div>
                  )}

                  {formData.qantite_sortie && formData.prix_sortie && (
                    <div className="preview-total">
                      <label>Valeur Totale:</label>
                      <p>{(parseFloat(formData.qantite_sortie) * parseFloat(formData.prix_sortie)).toLocaleString()} DH</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="modal-footer">
              {modalMode === 'add' && (
                <>
                  <button className="btn-submit" onClick={createSortie}>Create Exit</button>
                  <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </>
              )}
              {modalMode === 'edit' && (
                <>
                  <button className="btn-submit" onClick={updateSortie}>Update Exit</button>
                  <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </>
              )}
              {modalMode === 'view' && (
                <button className="btn-submit" onClick={() => setIsModalOpen(false)}>Close</button>
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