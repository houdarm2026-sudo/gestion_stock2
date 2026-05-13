import { useLocation } from "react-router-dom";
import './Navbar1.css';
const Navbar = ()=>{
    const handleLogout=()=>{
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        window.location.href='/';
    }
    const location=useLocation();
    const getPageTitle= () =>{
        switch(location.pathname){
            case '/':
                return 'Dashboard';
            case '/articles':
                return 'Artilces Management';
            case '/stock-entries':
                return 'Stock Entries Management';
            case '/stock-exits':
                return 'Stock Exits Management';
            default:
                return 'Dashboard';
        }
    };
    return(
        <div className="navbar">
            <div className="navbar-left">
                <h1>{getPageTitle()}</h1>
                <p>Welcome back ,Administrator</p>
            </div>
            <div className="navbar-right">
                <div className="notfication-icon">
                <span className="notification-badge">3</span>
            </div>
           
        </div>
        <div onClick={handleLogout}><button style={{color:'white',backgroundColor:'blue',borderRadius:'10px',border:"none",padding:"10px"}}>Deconnexion</button></div>
    </div>
    )
}
export default Navbar;