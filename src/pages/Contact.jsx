import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="contact-container">
      {/* Navbar ajoutée */}
      <header className="contact-navbar">
        <div className="nav-logo">StockPro</div>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/tarifs">Tarifs</Link>
          <Link to="/contact" style={{textDecoration:"underline", color:"green"}}>Contact</Link>
        </nav>
        <button className="nav-btn" onClick={() => navigate("/connexion")}>
          Connexion
        </button>
      </header>

      {/* Header avec image de fond */}
      <div className="contact-header">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1>Contactez-nous</h1>
          <p>
            Vous avez des questions sur le gestion de votre inventaire ? Notre équipe d'experts à Tanger
            est prête à vous accompagner pour optimiser votre logistique.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="contact-content">
        {/* Formulaire à gauche */}
        <div className="contact-form">
          <h2>Envoyez un message</h2>

          <div className="form-group">
            <label>NOM COMPLET</label>
            <input type="text" placeholder="Ahmed El Manaou" />
          </div>

          <div className="form-group">
            <label>EMAIL</label>
            <input type="email" placeholder="amendo@entreprise.ma" />
          </div>

          <div className="form-group">
            <label>SALUT</label>
            <input type="text" placeholder="Demande de démonstration" />
          </div>

          <div className="form-group">
            <label>MESSAGE</label>
            <textarea placeholder="Comment pouvez-vous vous aider ?"></textarea>
          </div>

          <button className="btn-submit">Envoyer le message</button>
        </div>

        {/* Informations à droite avec image */}
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <div className="info-text">
              <h4>EMAIL</h4>
              <p>exemle@gmail.com</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <div className="info-text">
              <h4>TELEPHONE</h4>
              <p>+212 5 22 00 00 00</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📍</div>
            <div className="info-text">
              <h4>ADRESSE</h4>
              <p>Al safa , Route A Diae, Tanger, Maroc</p>
            </div>
          </div>

          {/* Image supermarché dans la carte */}
          <div className="info-image">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop"
              alt="Supermarché"
            />
          </div>
        </div>
      </div>

      {/* Section ville avec icône */}
      <div className="city-section">
        <div className="city-card">
          <span className="city-icon">📍</span>
          <h3>TANGER, Maroc</h3>
        </div>
      </div>

      {/* Partenaires */}
      <div className="partners">
        <span>🏢 MOROCCO TECH</span>
        <span>📊 LOIS-NA</span>
        <span>🏦 CASA INVEST</span>
        <span>☁️ ATLAS CLOUD</span>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-logo">📦 StockPro</div>
        <p>© 2026 StockPro Operations, Precision Inventory Management.</p>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #e8f0e8 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 100vh;
          padding: 40px;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
        }

        /* Styles de la navbar */
        .contact-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          background: white;
          border-bottom: 1px solid #e0e8e0;
        }

        .nav-logo {
          font-size: 24px;
          font-weight: bold;
          color: #1a472a;
        }

        .nav-links {
          display: flex;
          gap: 30px;
        }

        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #1a472a;
        }

        .nav-btn {
          background: #1a472a;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: #2d5a3d;
          transform: translateY(-2px);
        }

        /* Header avec image */
        .contact-header {
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=300&fit=crop');
          background-size: cover;
          background-position: center;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .header-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(26, 71, 42, 0.9) 0%, rgba(26, 71, 42, 0.7) 100%);
        }

        .header-content {
          position: relative;
          z-index: 2;
          color: white;
          padding: 0 40px;
        }

        .header-content h1 {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .header-content p {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.95;
          line-height: 1.6;
        }

        /* Content */
        .contact-content {
          display: flex;
          flex-wrap: wrap;
          padding: 60px;
          gap: 50px;
          background: white;
        }

        /* Form */
        .contact-form {
          flex: 1.5;
        }

        .contact-form h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 32px;
          color: #1a472a;
          position: relative;
          display: inline-block;
        }

        .contact-form h2:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 50px;
          height: 3px;
          background: #f5a623;
          border-radius: 2px;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-group label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #999;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px 0;
          border: none;
          border-bottom: 2px solid #e0e0e0;
          font-size: 1rem;
          font-family: inherit;
          background: transparent;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-bottom-color: #1a472a;
        }

        .form-group textarea {
          resize: none;
          min-height: 80px;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #bbb;
        }

        .btn-submit {
          background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%);
          color: white;
          border: none;
          padding: 14px 36px;
          border-radius: 40px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(26, 71, 42, 0.3);
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(26, 71, 42, 0.4);
        }

        /* Info Card moderne */
        .contact-info {
          flex: 1;
          background: linear-gradient(135deg, #f0f4e8 0%, #e8f0e0 100%);
          padding: 35px;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 28px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(26, 71, 42, 0.1);
        }

        .info-icon {
          font-size: 1.8rem;
        }

        .info-text {
          flex: 1;
        }

        .info-text h4 {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #6b8c6b;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .info-text p {
          font-size: 0.9rem;
          color: #1a472a;
          font-weight: 500;
          line-height: 1.4;
        }

        .info-image {
          margin-top: 20px;
          border-radius: 16px;
          overflow: hidden;
        }

        .info-image img {
          width: 100%;
          height: auto;
          border-radius: 16px;
          transition: transform 0.3s ease;
        }

        .info-image img:hover {
          transform: scale(1.02);
        }

        /* City Section */
        .city-section {
          padding: 0 60px 30px 60px;
        }

        .city-card {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%);
          padding: 12px 28px;
          border-radius: 50px;
          box-shadow: 0 5px 15px rgba(26, 71, 42, 0.2);
        }

        .city-icon {
          font-size: 1.2rem;
        }

        .city-card h3 {
          font-size: 0.9rem;
          font-weight: 500;
          color: white;
        }

        /* Partners */
        .partners {
          padding: 30px 60px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          background: #f8faf5;
          border-top: 1px solid #e0e8e0;
          border-bottom: 1px solid #e0e8e0;
        }

        .partners span {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1a472a;
          letter-spacing: 0.5px;
          padding: 8px 16px;
          background: white;
          border-radius: 40px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        /* Footer */
        .footer {
          padding: 35px 60px;
          text-align: center;
          background: white;
        }

        .footer-logo {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a472a;
          margin-bottom: 12px;
        }

        .footer p {
          font-size: 0.7rem;
          color: #aaa;
        }

        /* Responsive */
        @media (max-width: 900px) {
          body {
            padding: 20px;
          }
          
          .contact-navbar {
            padding: 15px 30px;
            flex-direction: column;
            gap: 15px;
          }
          
          .nav-links {
            gap: 20px;
          }
          
          .contact-header {
            height: 220px;
          }
          
          .header-content h1 {
            font-size: 2rem;
          }
          
          .contact-content {
            flex-direction: column;
            padding: 40px 30px;
          }
          
          .city-section {
            padding: 0 30px 20px 30px;
          }
          
          .partners {
            padding: 20px 30px;
            justify-content: center;
          }
          
          .footer {
            padding: 25px 30px;
          }
        }

        @media (max-width: 480px) {
          .header-content h1 {
            font-size: 1.6rem;
          }
          
          .header-content p {
            font-size: 0.9rem;
          }
          
          .contact-form h2 {
            font-size: 1.3rem;
          }
          
          .nav-links {
            gap: 15px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;