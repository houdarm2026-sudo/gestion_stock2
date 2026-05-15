import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Acceuil = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)",
      minHeight: "100vh"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      position: "sticky",
      top: 0,
      zIndex: 100
    },
    logo: {
      fontSize: "26px",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #22c55e, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      cursor: "pointer"
    },
    nav: {
      display: "flex",
      gap: "35px",
      alignItems: "center"
    },
    navLink: {
      textDecoration: "none",
      color: "#334155",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.3s",
      cursor: "pointer",
      padding: "8px 0"
    },
    btnDemo: {
      background: "linear-gradient(135deg, #22c55e, #3b82f6)",
      color: "white",
      border: "none",
      padding: "10px 28px",
      borderRadius: "30px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      boxShadow: "0 2px 10px rgba(34, 197, 94, 0.3)"
    },
    hero: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "60px 40px",
      maxWidth: "1280px",
      margin: "0 auto",
      gap: "50px"
    },
    heroContent: {
      flex: 1
    },
    heroTitle: {
      fontSize: "48px",
      background: "linear-gradient(135deg, #166534, #1e40af)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "20px",
      textAlign: "center",
      fontWeight: "800"
    },
    subtitle: {
      fontSize: "18px",
      color: "#475569",
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
      background: "linear-gradient(135deg, #22c55e, #3b82f6)",
      color: "white",
      border: "none",
      padding: "12px 32px",
      borderRadius: "40px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)"
    },
    btnSecondary: {
      backgroundColor: "transparent",
      color: "#3b82f6",
      border: "2px solid #3b82f6",
      padding: "12px 32px",
      borderRadius: "40px",
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
      color: "#22c55e"
    },
    heroImage: {
      flex: 1,
      textAlign: "center"
    },
    image: {
      width: "100%",
      maxWidth: "500px",
      borderRadius: "30px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      border: "4px solid white"
    },
    trustedBy: {
      textAlign: "center",
      padding: "50px 40px",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: "30px",
      margin: "20px 40px"
    },
    brands: {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      flexWrap: "wrap",
      marginTop: "20px"
    },
    brandItem: {
      color: "#22c55e",
      fontSize: "15px",
      fontWeight: "500",
      padding: "8px 16px",
      backgroundColor: "white",
      borderRadius: "30px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    },
    features: {
      padding: "60px 40px",
      maxWidth: "1280px",
      margin: "0 auto"
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "36px",
      background: "linear-gradient(135deg, #166534, #1e40af)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "50px",
      fontWeight: "700"
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "30px"
    },
    featureCard: {
      backgroundColor: "white",
      padding: "35px 25px",
      borderRadius: "24px",
      textAlign: "center",
      transition: "all 0.3s",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
      cursor: "pointer"
    },
    icon: {
      fontSize: "52px",
      marginBottom: "20px"
    },
    testimonial: {
      background: "linear-gradient(135deg, #22c55e, #3b82f6)",
      textAlign: "center",
      padding: "70px 40px",
      margin: "40px 40px",
      borderRadius: "40px",
      color: "white"
    },
    stars: {
      fontSize: "28px",
      color: "#fbbf24",
      marginBottom: "20px",
      letterSpacing: "4px"
    },
    blockquote: {
      fontSize: "22px",
      fontStyle: "italic",
      lineHeight: "1.5",
      maxWidth: "800px",
      margin: "0 auto"
    },
    cta: {
      background: "linear-gradient(135deg, #f0fdf4, #e0f2fe)",
      textAlign: "center",
      padding: "70px 40px",
      margin: "40px",
      borderRadius: "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)"
    },
    ctaButtons: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      marginTop: "35px",
      flexWrap: "wrap"
    },
    btnOutline: {
      backgroundColor: "transparent",
      color: "#3b82f6",
      border: "2px solid #3b82f6",
      padding: "12px 32px",
      borderRadius: "40px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s"
    },
    footer: {
      background: "linear-gradient(135deg, #064e3b, #1e3a8a)",
      color: "#cbd5e1",
      padding: "60px 40px"
    },
    footerContent: {
      maxWidth: "1280px",
      margin: "0 auto"
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "2.5rem"
    },
    footerLogo: {
      background: "linear-gradient(135deg, #22c55e, #60a5fa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "16px",
      fontSize: "24px"
    },
    footerTitle: {
      color: "#ffffff",
      marginBottom: "16px",
      fontSize: "18px"
    },
    footerLink: {
      cursor: "pointer",
      marginBottom: "10px",
      transition: "color 0.3s",
      fontSize: "14px"
    },
    footerBottom: {
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      marginTop: "2rem",
      paddingTop: "1.5rem",
      textAlign: "center",
      fontSize: "0.8rem"
    }
  };

  // Hover handlers
  const handleNavHover = (e, isEnter) => {
    e.target.style.color = isEnter ? "#22c55e" : "#334155";
  };

  const handleBtnPrimaryHover = (e, isEnter) => {
    if (isEnter) {
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 8px 25px rgba(34, 197, 94, 0.4)";
    } else {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "0 4px 15px rgba(34, 197, 94, 0.3)";
    }
  };

  const handleBtnSecondaryHover = (e, isEnter) => {
    if (isEnter) {
      e.target.style.backgroundColor = "#3b82f6";
      e.target.style.color = "white";
    } else {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = "#3b82f6";
    }
  };

  const handleCardHover = (e, isEnter) => {
    if (isEnter) {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05)";
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate("/")}>📦 StockFlow</div>
        <nav style={styles.nav}>
          <Link 
            to="/" 
            style={{ ...styles.navLink, fontWeight: "bold", color: "#22c55e" }}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
          >
            Accueil
          </Link>
          <Link 
            to="/solutions" 
            style={styles.navLink}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
          >
            Solutions
          </Link>
          <Link 
            to="/tarifs" 
            style={styles.navLink}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
          >
            Tarifs
          </Link>
          <Link 
            to="/contact" 
            style={styles.navLink}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
          >
            Contact
          </Link>
        </nav>
        <button 
          style={styles.btnDemo}
          onClick={() => navigate("/connexion")}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 10px rgba(34, 197, 94, 0.3)";
          }}
        >
          Connexion
        </button>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Optimisez la Gestion de votre Supermarché</h1>
          <p style={styles.subtitle}>
            Pilotez en temps réel vos stocks, vos ventes et vos approvisionnements 
            grâce à une solution intuitive et puissante.
          </p>
          <div style={styles.heroButtons}>
            <button 
              style={styles.btnPrimary}
              onClick={() => navigate("/connexion")}
              onMouseEnter={handleBtnPrimaryHover}
              onMouseLeave={handleBtnPrimaryHover}
            >
              Commencer gratuitement
            </button>
            <button 
              style={styles.btnSecondary}
              onClick={() => navigate("/contact")}
              onMouseEnter={handleBtnSecondaryHover}
              onMouseLeave={handleBtnSecondaryHover}
            >
              Voir la démo
            </button>
          </div>
          <div style={styles.trustBadges}>
            <span>✅ Sans engagement</span>
            <span>⭐ 14 jours d'essai gratuit</span>
            <span>🚀 Support 24/7</span>
          </div>
        </div>

        <div style={styles.heroImage}>
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=500&fit=crop"
            alt="Supermarché"
            style={styles.image}
          />
        </div>
      </section>

      {/* Trusted by */}
      <div style={styles.trustedBy}>
        <p style={{ fontSize: "20px", fontWeight: "bold", background: "linear-gradient(135deg, #22c55e, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Pourquoi choisir StockFlow ?
        </p>
        <div style={styles.brands}>
          <span style={styles.brandItem}>📦 Gestion intelligente</span>
          <span style={styles.brandItem}>✨ Interface moderne</span>
          <span style={styles.brandItem}>🎯 Solution complète</span>
          <span style={styles.brandItem}>📊 Analytics avancés</span>
        </div>
      </div>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Tout ce dont vous avez besoin</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard} onMouseEnter={handleCardHover} onMouseLeave={handleCardHover}>
            <div style={styles.icon}>📦</div>
            <h3 style={{ color: "#166534", marginBottom: "12px" }}>Inventaire Temps Réel</h3>
            <p style={{ color: "#64748b" }}>Suivez vos stocks en direct avec alertes automatiques</p>
          </div>
          <div style={styles.featureCard} onMouseEnter={handleCardHover} onMouseLeave={handleCardHover}>
            <div style={styles.icon}>🤖</div>
            <h3 style={{ color: "#166534", marginBottom: "12px" }}>Alertes Intelligentes</h3>
            <p style={{ color: "#64748b" }}>Anticipez les besoins avec l'IA</p>
          </div>
          <div style={styles.featureCard} onMouseEnter={handleCardHover} onMouseLeave={handleCardHover}>
            <div style={styles.icon}>📊</div>
            <h3 style={{ color: "#166534", marginBottom: "12px" }}>Rapports Avancés</h3>
            <p style={{ color: "#64748b" }}>Analysez vos performances</p>
          </div>
          <div style={styles.featureCard} onMouseEnter={handleCardHover} onMouseLeave={handleCardHover}>
            <div style={styles.icon}>🔄</div>
            <h3 style={{ color: "#166534", marginBottom: "12px" }}>Multi-Sites</h3>
            <p style={{ color: "#64748b" }}>Gérez plusieurs magasins</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={styles.testimonial}>
        <div style={styles.stars}>★★★★★</div>
        <blockquote style={styles.blockquote}>
          "Depuis que nous utilisons StockFlow, nos pertes liées aux produits périmés ont chuté de 45% et nos employés gagnent 2 heures par jour sur les inventaires."
        </blockquote>
        <p style={{ marginTop: "30px", fontWeight: "600" }}>- Directeur HyperMarket</p>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <h2 style={{ fontSize: "32px", background: "linear-gradient(135deg, #166534, #1e40af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Prêt à moderniser votre supermarché ?
        </h2>
        <p style={{ fontSize: "18px", color: "#475569", marginTop: "16px" }}>
          Rejoignez plus de 500 magasins qui font confiance à StockFlow
        </p>
        <div style={styles.ctaButtons}>
          <button 
            style={styles.btnPrimary}
            onClick={() => navigate("/connexion")}
            onMouseEnter={handleBtnPrimaryHover}
            onMouseLeave={handleBtnPrimaryHover}
          >
            Commencer l'essai gratuit
          </button>
          <button 
            style={styles.btnOutline}
            onClick={() => navigate("/contact")}
            onMouseEnter={handleBtnSecondaryHover}
            onMouseLeave={handleBtnSecondaryHover}
          >
            Contacter un expert
          </button>
        </div>
        <p style={{ marginTop: "30px", color: "#22c55e", fontWeight: "500" }}>✨ Essai de 14 jours, sans engagement ✨</p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerGrid}>
            <div>
              <h2 style={styles.footerLogo}>📦 StockFlow</h2>
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", opacity: 0.8 }}>
                La solution leader pour la gestion de stock
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
            <p>© 2026 StockFlow - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Acceuil;