import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Acceuil from './pages/Acceuil';
import Connexion from './pages/Connexion';
import Solutions from './pages/Solutions';
import Dashboard from './pages/Dashboard';
import ArticleManager from './pages/ArticleManager';
import StockEntries from './pages/StockEntries';
import StockSorties from './pages/StockSorties';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';

// Layout pour pages dashboard
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

        {/*  Public pages */}
        <Route path="/" element={<Acceuil />} />
        <Route path="/solutions" element={<Solutions />} />
        
        <Route path="/connexion" element={<Connexion />} />

        {/*  Dashboard pages */}
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


      </Routes>
    </Router>
  );
}

export default App;