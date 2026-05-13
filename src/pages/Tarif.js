import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Tarif.css';

const Tarifs = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "29",
      features: ["Jusqu'à 500 produits", "1 utilisateur", "Support email", "Rapports basiques"],
      recommended: false
    },
    {
      name: "Professional",
      price: "79",
      features: ["Jusqu'à 5000 produits", "5 utilisateurs", "Support prioritaire", "Analytics avancés", "API accessible"],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "199",
      features: ["Produits illimités", "Utilisateurs illimités", "Support 24/7", "Solutions personnalisées", "Dédié account manager"],
      recommended: false
    }
  ];

  return (
    <div className="tarifs-container">
      {/* Header */}
      <header className="header">
        <div className="logo">StockPro</div>
        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/tarifs" style={{textDecoration:"underline", color:"green"}}>Tarifs</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button className="btn-demo" onClick={() => navigate("/connexion")}>
          Connexion
        </button>
      </header>

      {/* Tarifs Hero */}
      <section className="tarifs-hero">
        <h1>Tarifs Transparents</h1>
        <p>Choisissez le plan qui correspond à vos besoins</p>
      </section>

      {/* Pricing Cards */}
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
            {plan.recommended && <div className="recommended-badge">Recommandé</div>}
            <h3>{plan.name}</h3>
            <div className="price">
              <span className="currency">DH</span>
              <span className="amount">{plan.price}</span>
              <span className="period">/mois</span>
            </div>
            <ul className="features-list">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
            <button 
              className={`btn-subscribe ${plan.recommended ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => navigate("/connexion")}
            >
              Commencer
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Questions Fréquentes</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Puis-je changer de plan ?</h4>
            <p>Oui, vous pouvez changer ou annuler votre plan à tout moment.</p>
          </div>
          <div className="faq-item">
            <h4>Y a-t-il des frais d'installation ?</h4>
            <p>Non, tous nos plans sont sans frais d'installation.</p>
          </div>
          <div className="faq-item">
            <h4>Proposez-vous une version d'essai ?</h4>
            <p>Oui, bénéficiez de 14 jours d'essai gratuit sur tous les plans.</p>
          </div>
          <div className="faq-item">
            <h4>Support inclus ?</h4>
            <p>Le support est inclus dans tous nos plans, avec des niveaux différents selon l'abonnement.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-tarifs">
        <h2>Vous avez des questions ?</h2>
        <button className="btn-contact" onClick={() => navigate("/contact")}>
          Contactez notre équipe
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2026 StockPro
      </footer>
    </div>
  );
};

export default Tarifs;