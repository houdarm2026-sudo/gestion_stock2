import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Acceuil = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#ffffff",
      minHeight: "100vh"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 100
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#00c48c"
    },
    nav: {
      display: "flex",
      gap: "30px",
      alignItems: "center"
    },
    navLink: {
      textDecoration: "none",
      color: "#333",
      fontSize: "16px",
      transition: "color 0.3s",
      cursor: "pointer"
    },
    btnDemo: {
      backgroundColor: "#00c48c",
      color: "white",
      border: "none",
      padding: "10px 24px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s"
    },
    hero: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "60px 40px",
      maxWidth: "1200px",
      margin: "0 auto",
      gap: "50px"
    },
    heroContent: {
      flex: 1
    },
    heroTitle: {
      fontSize: "42px",
      color: "#1a1a2e",
      marginBottom: "20px",
      textAlign: "center"
    },
    subtitle: {
      fontSize: "18px",
      color: "#666",
      lineHeight: "1.6",
      marginBottom: "30px",
      textAlign: "center"
    },
    heroButtons: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      marginBottom: "24px"
    },
    btnPrimary: {
      backgroundColor: "#00c48c",
      color: "white",
      border: "none",
      padding: "12px 28px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s"
    },
    btnSecondary: {
      backgroundColor: "transparent",
      color: "#00c48c",
      border: "2px solid #00c48c",
      padding: "12px 28px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s"
    },
    trustBadges: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      fontSize: "14px",
      color: "#666"
    },
    heroImage: {
      flex: 1,
      textAlign: "center"
    },
    image: {
      width: "100%",
      maxWidth: "500px",
      borderRadius: "20px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
    },
    trustedBy: {
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#f8f9fa"
    },
    brands: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      flexWrap: "wrap",
      marginTop: "20px"
    },
    brandItem: {
      color: "#666",
      fontSize: "14px"
    },
    features: {
      padding: "60px 40px",
      maxWidth: "1200px",
      margin: "0 auto"
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "32px",
      color: "#1a1a2e",
      marginBottom: "40px"
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "30px"
    },
    featureCard: {
      backgroundColor: "#f8f9fa",
      padding: "30px",
      borderRadius: "16px",
      textAlign: "center",
      transition: "transform 0.3s"
    },
    icon: {
      fontSize: "48px",
      marginBottom: "16px"
    },
    testimonial: {
      backgroundColor: "#f1fcf9",
      textAlign: "center",
      padding: "60px 40px"
    },
    stars: {
      fontSize: "24px",
      color: "#ffc107",
      marginBottom: "20px"
    },
    blockquote: {
      fontSize: "20px",
      color: "#333",
      fontStyle: "italic",
      lineHeight: "1.6"
    },
    cta: {
      backgroundColor: "#f1fcf9",
      textAlign: "center",
      padding: "60px 40px",
      margin: "40px 0"
    },
    ctaButtons: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      marginTop: "30px",
      flexWrap: "wrap"
    },
    btnOutline: {
      backgroundColor: "transparent",
      color: "#00c48c",
      border: "2px solid #00c48c",
      padding: "12px 28px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer"
    },
    footer: {
      background: "#0f172a",
      color: "#cbd5e1",
      padding: "60px 40px"
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto"
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "2rem"
    },
    footerLogo: {
      color: "#00c48c",
      marginBottom: "16px"
    },
    footerTitle: {
      color: "#ffffff",
      marginBottom: "16px"
    },
    footerLink: {
      cursor: "pointer",
      marginBottom: "8px",
      transition: "color 0.3s"
    },
    footerBottom: {
      borderTop: "1px solid #1e293b",
      marginTop: "2rem",
      paddingTop: "1rem",
      textAlign: "center",
      fontSize: "0.8rem"
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>StockPro</div>
        <nav style={styles.nav}>
          <Link to="/" style={{ ...styles.navLink, textDecoration: "underline", color: "#00c48c" }}>Accueil</Link>
          <Link to="/solutions" style={styles.navLink}>Solutions</Link>
          <Link to="/tarifs" style={styles.navLink}>Tarifs</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </nav>
        <button 
          style={styles.btnDemo}
          onClick={() => navigate("/connexion")}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#00a878"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#00c48c"}
        >
          Connexion
        </button>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Optimisez la Gestion de votre <br />Supermarché</h1>
          <p style={styles.subtitle}>
            Pilotez en temps réel vos stocks, vos ventes et vos approvisionnements 
            grâce à une solution intuitive et puissante.
          </p>
          <div style={styles.heroButtons}>
            <button 
              style={styles.btnPrimary}
              onClick={() => navigate("/connexion")}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#00a878"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#00c48c"}
            >
              Commencer gratuitement
            </button>
            <button 
              style={styles.btnSecondary}
              onClick={() => navigate("/contact")}
              onMouseEnter={(e) => { e.target.style.backgroundColor = "#00c48c"; e.target.style.color = "white"; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = "#00c48c"; }}
            >
              Voir la démo
            </button>
          </div>
          <div style={styles.trustBadges}>
            <span>✔ Sans engagement</span>
            <span>✔ 14 jours d'essai gratuit</span>
          </div>
        </div>

        <div style={styles.heroImage}>
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=450&fit=crop"
            alt="Supermarché"
            style={styles.image}
          />
        </div>
      </section>

      {/* Trusted by */}
      <div style={styles.trustedBy}>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#00c48c" }}>Pourquoi choisir StockPro ?</p>
        <div style={styles.brands}>
          <span style={styles.brandItem}>📦 Nos points forts</span>
          <span style={styles.brandItem}>✨ Les avantages de notre solution</span>
          <span style={styles.brandItem}>🎯 Une solution pensée pour vous</span>
          <span style={styles.brandItem}>📊 Optimisez votre gestion de stock</span>
        </div>
      </div>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Tout ce dont vous avez besoin pour gérer votre rayon</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.icon}>📦</div>
            <h3>Inventaire en Temps Réel</h3>
            <p>Suivez vos stocks en direct et recevez des alertes automatiques en cas de rupture.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.icon}>🤖</div>
            <h3>Alertes Intelligentes</h3>
            <p>Anticipez les besoins grâce à l'IA et optimisez vos commandes.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.icon}>📊</div>
            <h3>Rapports Avancés</h3>
            <p>Analysez vos performances avec des rapports détaillés et personnalisables.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.icon}>🔄</div>
            <h3>Synchronisation Multi-Sites</h3>
            <p>Gérez plusieurs magasins en même temps avec une synchronisation en temps réel.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={styles.testimonial}>
        <div style={styles.stars}>★★★★★</div>
        <blockquote style={styles.blockquote}>
          "Depuis que nous utilisons StockPro, nos pertes liées aux produits <br />périmés ont chuté de 45% et nos employés gagnent 2 heures par jour sur les inventaires."
        </blockquote>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <h2 style={{ fontSize: "28px", color: "#1a1a2e" }}>Prêt à moderniser votre supermarché ?</h2>
        <p style={{ fontSize: "16px", color: "#666", marginTop: "16px" }}>
          Rejoignez plus de 500 magasins qui font confiance à StockPro pour leur gestion quotidienne.
        </p>
        <div style={styles.ctaButtons}>
          <button 
            style={styles.btnPrimary}
            onClick={() => navigate("/connexion")}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#00a878"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#00c48c"}
          >
            Commencer l'essai gratuit
          </button>
          <button 
            style={styles.btnOutline}
            onClick={() => navigate("/contact")}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#00c48c"; e.target.style.color = "white"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = "#00c48c"; }}
          >
            Contacter un expert
          </button>
        </div>
        <p style={{ marginTop: "24px", color: "#666" }}>Essai de 14 jours, sans engagement.</p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerGrid}>
            <div>
              <h2 style={styles.footerLogo}>StockPro</h2>
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                La solution leader pour la gestion du stock d'un supermarché.
              </p>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Produit</h4>
              <p style={styles.footerLink} onClick={() => navigate("/solutions")}>Fonctionnalités</p>
              <p style={styles.footerLink} onClick={() => navigate("/tarifs")}>Tarification</p>
              <p style={styles.footerLink}>Intégrations</p>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Entreprise</h4>
              <p style={styles.footerLink}>À propos</p>
              <p style={styles.footerLink}>Blog</p>
              <p style={styles.footerLink}>Carrières</p>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Support</h4>
              <p style={styles.footerLink}>Centre d'aide</p>
              <p style={styles.footerLink} onClick={() => navigate("/contact")}>Contact</p>
              <p style={styles.footerLink}>API Documentation</p>
            </div>
          </div>

          <div style={styles.footerBottom}>
            © 2026 StockPro - Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Acceuil;