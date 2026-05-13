import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Solution.css';

const Solution = () => {
  const navigate = useNavigate();

  return (
    <div className="solutions-container">
      {/* Header */}
      <header className="header">
        <div className="logo">StockPro</div>
        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/solutions" style={{textDecoration:"underline", color:"green"}}>Solutions</Link>
          <Link to="/tarifs">Tarifs</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button className="btn-demo" onClick={() => navigate("/connexion")}>
          Connexion
        </button>
      </header>

      {/* Hero Solutions */}
      <section className="solutions-hero">
        <h1>Nos Solutions Innovantes</h1>
        <p>Des outils adaptés à tous vos besoins de gestion d'inventaire</p>
      </section>

      {/* Solutions Grid */}
      <section className="solutions-grid">
        <div className="solution-card">
          <div className="solution-icon">📦</div>
          <h3>Gestion des Stocks</h3>
          <p>Suivez vos produits en temps réel, gérez les entrées et sorties, et optimisez vos niveaux de stock.</p>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon">📊</div>
          <h3>Analytics & Reporting</h3>
          <p>Tableaux de bord personnalisés, rapports détaillés et analyses prédictives pour anticiper la demande.</p>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon">🤖</div>
          <h3>Alertes Automatiques</h3>
          <p>Notifications intelligentes pour les ruptures de stock, dates de péremption et réapprovisionnement.</p>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon">🔄</div>
          <h3>Multi-sites</h3>
          <p>Gérez tous vos magasins depuis une interface unique avec synchronisation en temps réel.</p>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon">📱</div>
          <h3>Application Web</h3>
          <p>Accédez à vos données où que vous soyez avec notre application Web intuitive.</p>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon">🔒</div>
          <h3>Sécurité des Données</h3>
          <p>Protection avancée de vos données avec chiffrement et sauvegardes automatiques.</p>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus</button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-solutions">
        <h2>Prêt à transformer votre gestion ?</h2>
        <button className="btn-primary" onClick={() => navigate("/connexion")}>
          Commencer maintenant
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2026 StockPro
      </footer>
    </div>
  );
};

export default Solution;