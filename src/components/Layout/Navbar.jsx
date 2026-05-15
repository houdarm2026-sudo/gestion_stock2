import { useLocation } from "react-router-dom";
import './Navbar1.css';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const location = useLocation();

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/articles':
        return 'Articles Management';
      case '/stock-entries':
        return 'Stock Entries Management';
      case '/stock-exits':
        return 'Stock Exits Management';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>{getPageTitle()}</h1>
        <p>Welcome back, Administrator</p>
      </div>
      
      <div className="navbar-right">
        
        
        
        <button className="logout-btn" onClick={handleLogout}>
         {/*l'ajout de l'icone */} <span></span>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;