import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Acceuil from './pages/Acceuil';
import Connexion from './pages/Connexion';
import Solution from './pages/Solution';
import Tarif from './pages/Tarif';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import ArticleManager from './pages/ArticleManager';
import StockEntries from './pages/StockEntries';
import StockSorties from './pages/StockSorties';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';

// Layout pour les pages avec Sidebar et Navbar
const AppLayout = ({ children }) => {
  return (
    <div className='app'>
      <Sidebar />
      <div className='main-content'>
        <Navbar />
        <div className='page-content'>
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages sans Sidebar ni Navbar */}
        <Route path="/" element={<Acceuil />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/tarif" element={<Tarif />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<Connexion />} />
        
        {/* Pages avec Sidebar et Navbar */}
        <Route path="/dashboard" element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        } />
        
        <Route path="/articles" element={
          <AppLayout>
            <ArticleManager />
          </AppLayout>
        } />
        
        <Route path="/stock-entries" element={
          <AppLayout>
            <StockEntries />
          </AppLayout>
        } />
        
        <Route path="/stock-exits" element={
          <AppLayout>
            <StockSorties />
          </AppLayout>
        } />
        <Route path="/solutions" element={<Solution />} />
<Route path="/tarifs" element={<Tarif/>} />
<Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;