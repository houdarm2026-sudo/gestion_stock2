import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  FiPackage, 
  FiBarChart2, 
  FiBell, 
  FiGitMerge, 
  FiSmartphone, 
  FiShield,
  FiCheckCircle,
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiDatabase,
  FiCloud
} from 'react-icons/fi';
import './Solution.css';

const Solutions = () => {
  const navigate = useNavigate();

  return (
    <div className="solutions-container">
      {/* Header */}
      <header className="header">
        <div className="logo">📦 StockFlow</div>
        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/solutions" className="active">Solutions</Link>
          <Link to="/tarifs">Tarifs</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button className="btn-demo" onClick={() => navigate("/connexion")}>
          Connexion
        </button>
      </header>

      {/* Hero Solutions */}
      <section className="solutions-hero">
        <h1>Des solutions complètes pour <span className="highlight">votre gestion de stock</span></h1>
        <p>Découvrez comment StockFlow peut transformer votre gestion d'inventaire et booster votre efficacité</p>
      </section>

      {/* Solutions Grid */}
      <section className="solutions-grid">
        <div className="solution-card">
          <div className="solution-icon"><FiPackage size={40} /></div>
          <h3>Gestion des Stocks en Temps Réel</h3>
          <p>Suivez l'intégralité de votre inventaire en temps réel. Visualisez les mouvements d'entrée et sortie, consultez l'historique complet et bénéficiez d'une vue à 360° sur votre stock.</p>
          <ul className="solution-features">
            <li><FiCheckCircle size={14} /> Mise à jour automatique des quantités</li>
            <li><FiCheckCircle size={14} /> Historique des mouvements</li>
            <li><FiCheckCircle size={14} /> Export des rapports</li>
          </ul>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus →</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon"><FiBarChart2 size={40} /></div>
          <h3>Analytics & Reporting Avancés</h3>
          <p>Analysez vos performances avec des tableaux de bord personnalisés. Identifiez les produits les plus vendus, anticipez les tendances et optimisez vos réapprovisionnements.</p>
          <ul className="solution-features">
            <li><FiCheckCircle size={14} /> Tableaux de bord interactifs</li>
            <li><FiCheckCircle size={14} /> Rapports personnalisables</li>
            <li><FiCheckCircle size={14} /> Analyses prédictives</li>
          </ul>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus →</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon"><FiBell size={40} /></div>
          <h3>Alertes Intelligentes</h3>
          <p>Ne manquez plus aucune information critique. Recevez des notifications automatiques pour les stocks faibles, les ruptures imminentes, les dates de péremption et les commandes à passer.</p>
          <ul className="solution-features">
            <li><FiCheckCircle size={14} /> Alertes personnalisables</li>
            <li><FiCheckCircle size={14} /> Notifications par email</li>
            <li><FiCheckCircle size={14} /> Seuils personnalisés</li>
          </ul>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus →</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon"><FiGitMerge size={40} /></div>
          <h3>Gestion Multi-sites</h3>
          <p>Centralisez la gestion de tous vos magasins, entrepôts ou points de vente depuis une interface unique. Synchronisation automatique en temps réel entre tous vos sites.</p>
          <ul className="solution-features">
            <li><FiCheckCircle size={14} /> Vue consolidée multi-sites</li>
            <li><FiCheckCircle size={14} /> Transferts entre sites</li>
            <li><FiCheckCircle size={14} /> Comparaison des performances</li>
          </ul>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus →</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon"><FiSmartphone size={40} /></div>
          <h3>Application Web Responsive</h3>
          <p>Accédez à votre gestion de stock depuis n'importe quel appareil : ordinateur, tablette ou smartphone. Une expérience utilisateur fluide et adaptée à tous les écrans.</p>
          <ul className="solution-features">
            <li><FiCheckCircle size={14} /> Interface responsive</li>
            <li><FiCheckCircle size={14} /> Accès mobile optimisé</li>
            <li><FiCheckCircle size={14} /> Hors ligne possible</li>
          </ul>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus →</button>
        </div>

        <div className="solution-card">
          <div className="solution-icon"><FiShield size={40} /></div>
          <h3>Sécurité & Conformité</h3>
          <p>Vos données sont protégées par les meilleures technologies de sécurité. Sauvegardes automatiques, chiffrement des données et conformité RGPD garantis.</p>
          <ul className="solution-features">
            <li><FiCheckCircle size={14} /> Chiffrement SSL/TLS</li>
            <li><FiCheckCircle size={14} /> Sauvegardes quotidiennes</li>
            <li><FiCheckCircle size={14} /> Conformité RGPD</li>
          </ul>
          <button className="btn-solution" onClick={() => navigate("/contact")}>En savoir plus →</button>
        </div>
      </section>

      {/* Bonus Section - Pourquoi nous choisir */}
      <section className="why-us">
        <h2>Pourquoi choisir StockFlow ?</h2>
        <div className="why-grid">
          <div className="why-item">
            <FiTrendingUp size={32} />
            <h4>+45% d'efficacité</h4>
            <p>Réduction des erreurs de saisie</p>
          </div>
          <div className="why-item">
            <FiClock size={32} />
            <h4>-60% de temps</h4>
            <p>Gagné sur les inventaires</p>
          </div>
          <div className="why-item">
            <FiUsers size={32} />
            <h4>500+ clients</h4>
            <p>Entreprises satisfaites</p>
          </div>
          <div className="why-item">
            <FiDatabase size={32} />
            <h4>99.9% de fiabilité</h4>
            <p>Précision des données</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-solutions">
        <h2>Prêt à optimiser votre gestion de stock ?</h2>
        <p>Rejoignez plus de 500 entreprises qui nous font confiance</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate("/connexion")}>
            Commencer l'essai gratuit
          </button>
          <button className="btn-secondary" onClick={() => navigate("/contact")}>
            Contacter un expert
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>📦 StockFlow</h3>
            <p>La solution complète pour votre gestion de stock</p>
          </div>
          <div className="footer-links">
            <h4>Liens utiles</h4>
            <Link to="/">Accueil</Link>
            <Link to="/solutions">Solutions</Link>
            <Link to="/tarifs">Tarifs</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: contact@stockflow.com</p>
            <p>Tél: +212 5XX XXX XXX</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 StockFlow - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default Solutions;