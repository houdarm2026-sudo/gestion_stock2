import {NavLink} from "react-router-dom";
import './Sidebar1.css';
import { FiHome,  FiPackage,   FiDownload,  FiUpload ,FiUser} from 'react-icons/fi';

const Sidebar=()=>{
    return(
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>StockFlow</h2>
                <p>Entreprise Dashboard</p>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">< FiHome/></span>
                <span >Dashboard</span>
                </NavLink>

                  <NavLink to="/articles" className={({isActive})=> isActive ? 'nav-link active ' : 'nav-link'} >  
                <span className="nav-icon"><  FiPackage /></span> 
                <span>Articles</span> 
                </NavLink>

                  <NavLink to="/stock-entries" className={({isActive})=> isActive ? 'nav-link active ' : 'nav-link'} >  
                <span className="nav-icon"><  FiDownload/></span> 
                <span>Stock Entries </span> 
                </NavLink>

                  <NavLink to="/stock-exits" className={({isActive})=> isActive ? 'nav-link active ' : 'nav-link'} >  
                <span className="nav-icon"><  FiUpload/></span> 
                <span>Stock Exits</span> 
                </NavLink>
             </nav>

             <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar"><FiUser/></div>
                    <div>
                        <p className="user-name">Administrator</p>
                        
                    </div>
                </div>
             </div>
        </div>
    )
}
export default Sidebar;