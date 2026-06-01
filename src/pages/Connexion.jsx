import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Connexion1.css';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ email, name: 'Administrator' }));
        navigate('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-icon">📦</div>
          <h1>StockFlow</h1>
          <p>Solution professionnelle de gestion de stock</p>
        </div>
        
        <div className="login-features">
          <div className="feature-item">
            <span>✓</span>
            <p>Gestion d'inventaire en temps réel</p>
          </div>
          <div className="feature-item">
            <span>✓</span>
            <p>Suivi des entrées et sorties</p>
          </div>
          <div className="feature-item">
            <span>✓</span>
            <p>Alertes de stock automatiques</p>
          </div>
          <div className="feature-item">
            <span>✓</span>
            <p>Rapports et analyses avancés</p>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Connexion</h2>
            <p>Accédez à votre espace de travail</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email professionnel</label>
              <input
                type="email"
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          
          
          
         
        </div>
      </div>
    </div>
  );
};

export default Connexion;