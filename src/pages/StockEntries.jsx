import {FiEye,FiTrash2,FiDollarSign,FiBarChart2 ,FiPackage } from 'react-icons/fi';
import './StockEntries1.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8000/api';

const StockEntries = () => {
  const [entries, setEntries] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [formData, setFormData] = useState({
    num_bon_entree: '',
    date_entree: '',
    article_id: '',
    qantite_entree: '',
    prix_entree: '',
  });

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/entrees');
      setEntries(response.data);
    } catch (error) {
      console.log('Error fetching entries :', error);
      toast.error('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles :', error);
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchArticles();
  }, []);

  const getArticleName = (articleId) => {
    const article = articles.find(a => a.id === articleId);
    return article ? article.designation : 'Loading...';
  };

  const filteredEntries = entries.filter(entry =>
    entry.num_bon_entree?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getArticleName(entry.article_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      num_bon_entree: '',
      date_entree: '',
      article_id: '',
      qantite_entree: '',
      prix_entree: '',
    });
  };

  const openAddModal = () => {
    setModalMode('add');
    resetForm();
    setIsModalOpen(true);
  };

  const openViewModal = (entry) => {
    setModalMode('view');
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const createEntry = async () => {
    // Validation
    if (!formData.num_bon_entree || !formData.date_entree || !formData.article_id || !formData.qantite_entree || !formData.prix_entree) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await api.post('/entrees', formData);
      toast.success('Stock entry created successfully! Stock updated automatically.');
      fetchEntries();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(err => {
          toast.error(err[0]);
        });
      } else {
        toast.error('Failed to create entry');
      }
    }
  };

  // Delete entry
  const deleteEntry = async () => {
    try {
      await api.delete(`/entrees/${deleteConfirm.id}`);
      toast.success('Entry deleted successfully');
      fetchEntries();
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  // Calculate value total
  const totalEntries = entries.length;
  const totalValueMTD = entries.reduce((sum, entry) =>
    sum + (entry.qantite_entree * entry.prix_entree), 0
  );
  const totalQuantity = entries.reduce((sum, entry) =>
    sum + entry.qantite_entree, 0
  );

  return (
    <div className="entries-page">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="header-card">
        <div className="header-content">
          <div>
            <h1>📥 Stock Entries Management</h1>
            <p className="subtitle">Manage incoming stock and warehouse entries efficiently with real-time tracking.</p>
          </div>
          <button className="btn-primary" onClick={openAddModal}>
            + Add Entry
          </button>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search by entry number or article..."
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
      <div className="stats-grid" style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '20px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div className="stat-card" style={{ flex: '0 1 280px' }}>
          <div>
            <p className="stat-label">Total Entries</p>
            <p className="stat-value">{totalEntries.toLocaleString()}</p>
          </div>
          <div className="stat-icon"><FiBarChart2 /></div>
        </div>

        <div className="stat-card" style={{ flex: '0 1 280px' }}>
          <div>
            <p className="stat-label">Value MTD</p>
            <p className="stat-value">{totalValueMTD.toLocaleString()}</p>
          </div>
          <div className="stat-icon" size={10}>DH</div>
        </div>

        <div className="stat-card" style={{ flex: '0 1 280px' }}>
          <div>
            <p className="stat-label">Total Quantity</p>
            <p className="stat-value">{totalQuantity.toLocaleString()} units</p>
          </div>
          <div className="stat-icon"><FiPackage /></div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="entries-table">
          <thead>
            <tr>
              <th>NUM BON ENTREE</th>
              <th>DATE ENTREE</th>
              <th>ARTICLE</th>
              <th>QUANTITÉ ENTREE</th>
              <th>PRIX ENTREE</th>
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
            ) : currentEntries.length === 0 ? (
              <tr key="empty">
                <td colSpan="7" className="empty-cell">No entries found</td>
              </tr>
            ) : (
              currentEntries.map((entry) => {
                const totalValue = entry.qantite_entree * entry.prix_entree;
                return (
                  <tr key={entry.id}>
                    <td className="code-cell">{entry.num_bon_entree}</td>
                    <td>{new Date(entry.date_entree).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>{getArticleName(entry.article_id)}</td>
                    <td>{entry.qantite_entree?.toLocaleString()} units</td>
                    <td>${parseFloat(entry.prix_entree || 0).toFixed(2)}</td>
                    <td className="total-cell">${totalValue.toLocaleString()}</td>
                    <td className="actions-cell">
                      <button className="action-btn view" onClick={() => openViewModal(entry)}><FiEye size={18}/></button>
                      <button className="action-btn delete" onClick={() => setDeleteConfirm(entry)}><FiTrash2 size={18}/></button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && filteredEntries.length > 0 && (
          <div className="pagination-container">
            <div className="table-footer">
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredEntries.length)} of {filteredEntries.length} entries
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
                {modalMode === 'add' && 'Add New Stock Entry'}
                {modalMode === 'view' && 'Entry Details'}
              </h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              {modalMode === 'view' ? (
                <>
                  <div className="view-field">
                    <label>Num Bon Entrée</label>
                    <p>{selectedEntry?.num_bon_entree}</p>
                  </div>
                  <div className="view-field">
                    <label>Date Entrée</label>
                    <p>{new Date(selectedEntry?.date_entree).toLocaleDateString()}</p>
                  </div>
                  <div className="view-field">
                    <label>Article</label>
                    <p>{getArticleName(selectedEntry?.article_id)}</p>
                  </div>
                  <div className="view-field">
                    <label>Quantité Entrée</label>
                    <p>{selectedEntry?.qantite_entree?.toLocaleString()} units</p>
                  </div>
                  <div className="view-field">
                    <label>Prix Entrée</label>
                    <p>${parseFloat(selectedEntry?.prix_entree || 0).toFixed(2)}</p>
                  </div>
                  <div className="view-field">
                    <label>Valeur Totale</label>
                    <p className="total-field">
                      ${(selectedEntry?.qantite_entree * selectedEntry?.prix_entree).toLocaleString()}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Num Bon Entrée *</label>
                    <input 
                      type="text"  
                      name="num_bon_entree"
                      value={formData.num_bon_entree}
                      onChange={handleInputChange}
                      placeholder="Ex: #BE-2024-001"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Date Entrée *</label>
                    <input
                      type="date"
                      name="date_entree"
                      value={formData.date_entree}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Article *</label>
                    <select
                      name="article_id"
                      value={formData.article_id}
                      onChange={handleInputChange}
                      required
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
                    <label>Quantité Entrée *</label>
                    <input
                      type="number"
                      name="qantite_entree"
                      value={formData.qantite_entree}
                      onChange={handleInputChange}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Prix Entrée *</label>
                    <input
                      type="number"
                      step="0.01"
                      name="prix_entree"
                      value={formData.prix_entree}
                      onChange={handleInputChange}
                      placeholder="Enter price per unit"
                      required
                    />
                  </div>

                  {formData.qantite_entree && formData.prix_entree && (
                    <div className="preview-total">
                      <label>Valeur Totale:</label>
                      <p>{(parseFloat(formData.qantite_entree) * parseFloat(formData.prix_entree)).toLocaleString()}dh </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="modal-footer">
              {modalMode === 'add' && (
                <>
                  <button className="btn-submit" onClick={createEntry}>
                    Create Entry
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
              <h2>Delete Entry</h2>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete entry <strong>"{deleteConfirm.num_bon_entree}"</strong>?</p>
              <p>This will also decrease the article stock.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-delete" onClick={deleteEntry}>Delete</button>
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockEntries;