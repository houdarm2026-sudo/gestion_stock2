import {FiEye,FiEdit2,FiTrash2,FiPackage, FiAlertTriangle  } from 'react-icons/fi';
import './ArticleManager1.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:8000/api';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [formData, setFormData] = useState({
    code_article: '',
    designation: '',
    quantite_en_stock_reel: '',
    stock_min: '',
    stock_max: '',
    prix: ''
  });

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const getStockStatus = (stock, stockMin) => {
    if (stock <= stockMin) {
      return { label: 'Critical', color: 'red' };
    } else if (stock <= stockMin * 1.5) {
      return { label: 'Warning', color: 'orange' };
    }
    return { label: 'Optimal', color: 'green' };
  };

  const filteredArticles = articles.filter(article =>
    article.code_article?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      code_article: '',
      designation: '',
      quantite_en_stock_reel: '',
      stock_min: '',
      stock_max: '',
      prix: ''
    });
  };

  const openAddModal = () => {
    setModalMode('add');
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (article) => {
    setModalMode('edit');
    setSelectedArticle(article);
    setFormData({
      code_article: article.code_article,
      designation: article.designation,
      quantite_en_stock_reel: article.quantite_en_stock_reel,
      stock_min: article.stock_min,
      stock_max: article.stock_max,
      prix: article.prix
    });
    setIsModalOpen(true);
  };

  const openViewModal = (article) => {
    setModalMode('view');
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const createArticle = async () => {
    try {
      await api.post('/articles', formData);
      toast.success('Article created successfully');
      fetchArticles();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to create article');
    }
  };

  const updateArticle = async () => {
    try {
      await api.put(`/articles/${selectedArticle.id}`, formData);
      toast.success('Article updated successfully');
      fetchArticles();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to update article');
    }
  };

  const deleteArticle = async () => {
    try {
      await api.delete(`/articles/${deleteConfirm.id}`);
      toast.success('Article deleted successfully');
      fetchArticles();
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete article');
    }
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      createArticle();
    } else if (modalMode === 'edit') {
      updateArticle();
    }
  };

  const totalValue = articles.reduce((sum, article) => 
    sum + (article.quantite_en_stock_reel * article.prix), 0
  );

  const lowStockAlerts = articles.filter(article => 
    article.quantite_en_stock_reel <= article.stock_min
  ).length;

  return (
    <div className="articles-page">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="header-card">
        <div className="header-content">
          <div>
            <h1>📥 Articles Management</h1>
            <p className="subtitle">Manage products and monitor inventory stock efficiently.</p>
          </div>
          <button className="btn-primary" onClick={openAddModal}>
            + Add Article
          </button>
        </div>

        {/* Search */}
       <div style={{ position: "relative", display: "inline-block"}}>
  <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#888", pointerEvents: "none", display: "flex", alignItems: "center" }}>
    <FiSearch size={18} />
  </div>
  <input
    type="text"
    placeholder="Search by code or designation..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    }}
    style={{
      padding: "10px 10px 10px 36px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
      transition: "all 0.2s ease",
      width:"1000px"
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#007bff";
      e.target.style.boxShadow = "0 0 0 2px rgba(0, 123, 255, 0.25)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#ccc";
      e.target.style.boxShadow = "none";
    }}
  />
</div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p className="stat-label">Total Value</p>
            <p className="stat-value">{totalValue.toLocaleString()} dh </p>
          </div>  
        </div>
        
        <div className="stat-card">
          <div>
            <p className="stat-label">Low Stock Alerts</p>
            <p className="stat-value">{lowStockAlerts} Articles</p>
          </div>
          <div className="stat-icon">< FiAlertTriangle size= {18}/></div>
        </div>
        
        <div className="stat-card">
          <div>
            <p className="stat-label">Total Articles</p>
            <p className="stat-value">{articles.length}</p>
          </div>
          <div className="stat-icon"><FiPackage size={18} /></div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="articles-table">
          <thead>
            <tr>
              <th>Code Article</th>
              <th>Designation</th>
              <th>Quantité</th>
              <th>Stock Min</th>
              <th>Stock Max</th>
              <th>Prix</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr key="loading">
                <td colSpan="8" className="loading-cell">
                  <div className="spinner"></div>
                </td>
              </tr>
            ) : currentArticles.length === 0 ? (
              <tr key="empty">
                <td colSpan="8" className="empty-cell">No articles found</td>
              </tr>
            ) : (
              currentArticles.map((article) => {
                const status = getStockStatus(article.quantite_en_stock_reel, article.stock_min);
                return (
                  <tr key={article.id}>
                    <td className="code-cell">{article.code_article}</td>
                    <td>{article.designation}</td>
                    <td>{article.quantite_en_stock_reel.toLocaleString()}</td>
                    <td>{article.stock_min}</td>
                    <td>{article.stock_max}</td>
                    <td>{parseFloat(article.prix || 0).toFixed(2)} dh </td>
                    <td>
                      <span className={`badge badge-${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="action-btn view" onClick={() => openViewModal(article)}><FiEye size={18}/></button>
                      <button className="action-btn edit" onClick={() => openEditModal(article)}><FiEdit2 size={18}/></button>
                      <button className="action-btn delete" onClick={() => setDeleteConfirm(article)}><FiTrash2 size={18}/></button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        
        {/* Pagination Section */}
        {!loading && filteredArticles.length > 0 && (
          <div className="pagination-container">
            <div className="table-footer">
              Showing {indexOfFirstArticle + 1} to {Math.min(indexOfLastArticle, filteredArticles.length)} of {filteredArticles.length} items
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {modalMode === 'add' && 'Add New Article'}
                {modalMode === 'edit' && 'Edit Article'}
                {modalMode === 'view' && 'View Article'}
              </h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              {modalMode === 'view' ? (
                <>
                  <div className="view-field">
                    <label>Code Article</label>
                    <p>{selectedArticle?.code_article}</p>
                  </div>
                  <div className="view-field">
                    <label>Designation</label>
                    <p>{selectedArticle?.designation}</p>
                  </div>
                  <div className="view-field">
                    <label>Quantité en stock</label>
                    <p>{selectedArticle?.quantite_en_stock_reel?.toLocaleString()}</p>
                  </div>
                  <div className="view-field">
                    <label>Stock Min</label>
                    <p>{selectedArticle?.stock_min}</p>
                  </div>
                  <div className="view-field">
                    <label>Stock Max</label>
                    <p>{selectedArticle?.stock_max}</p>
                  </div>
                  <div className="view-field">
                    <label>Prix</label>
                    <p>{parseFloat(selectedArticle?.prix || 0).toFixed(2)} dh </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Code Article </label>
                    <input type="text" name="code_article" value={formData.code_article} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Designation </label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Quantité en stock </label>
                    <input type="number" name="quantite_en_stock_reel" value={formData.quantite_en_stock_reel} onChange={handleInputChange} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Stock Min </label>
                      <input type="number" name="stock_min" value={formData.stock_min} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Stock Max </label>
                      <input type="number" name="stock_max" value={formData.stock_max} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Prix </label>
                    <input type="number" step="0.01" name="prix" value={formData.prix} onChange={handleInputChange} />
                  </div>
                </>
              )}
            </div>
            
            <div className="modal-footer">
              {modalMode !== 'view' && (
                <>
                  <button className="btn-submit" onClick={handleSubmit}>
                    {modalMode === 'add' ? 'Create Article' : 'Update Article'}
                  </button>
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
              <h2>Delete Article</h2>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>"{deleteConfirm.designation}"</strong>?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-delete" onClick={deleteArticle}>Delete</button>
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManager;