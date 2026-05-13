import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard1.css';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        articles: 0,
        entries: 0,
        exits: 0,
        totalStockValue: 0,
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    
    useEffect(() => {
        fetchDashboardData();
    }, []);
    
    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // ✅ Correction 1: '/articles' au lieu de articles
            const articleRes = await api.get('/articles');
            const articles = articleRes.data;

            // ✅ Correction 2: '/entrees' au lieu de '/articles'
            const entriesRes = await api.get('/entrees');
            const entries = entriesRes.data;

            const exitsRes = await api.get('/sorties');
            const exits = exitsRes.data;

            const totalStockValue = articles.reduce((sum, article) =>
                sum + (article.quantite_en_stock_reel * article.prix), 0
            );
            
            setStats({
                articles: articles.length,
                entries: entries.length,
                exits: exits.length,
                totalStockValue: totalStockValue,
            });
            
            const activities = [
                ...entries.slice(0, 3).map(e => ({ type: 'entry', data: e, date: e.date_entree })),
                ...exits.slice(0, 3).map(s => ({ type: 'exit', data: s, date: s.date_sortie }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
            
            setRecentActivities(activities);
        
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const getArticleName = (articleId, articles) => {
        return `Article #${articleId}`;
    };
    
    return (
        <div className='dashboard'>
            <div className='stats-grid-dashboard'>
                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>📦</div>
                    <div className='stat-info-dashboard'>
                        <h3>{stats.articles}</h3>
                        <p>Total Articles</p>
                    </div>
                </div>
                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>📥</div>
                    <div className='stat-info-dashboard'>
                        <h3>{stats.entries}</h3>
                        <p>Stock Entries</p>
                    </div>
                </div>

                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>📤</div>
                    <div className='stat-info-dashboard'>
                        <h3>{stats.exits}</h3>
                        <p>Stock Exits</p>
                    </div>
                </div>
                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>💰</div>
                    <div className='stat-info-dashboard'>
                        <h3>€ {stats.totalStockValue.toLocaleString()}</h3>
                        <p>Total Stock Value</p>
                    </div>
                </div>
            </div>
            
            <div className='dashboard-actions'>
                <Link to='/articles' className='action-card'>
                    <span>📦</span>
                    <h3>Manage Articles</h3>
                    <p>View, add, edit or delete articles</p>
                </Link>

                <Link to='/stock-entries' className='action-card'>
                    <span>📥</span>
                    <h3>Stock Entries</h3>
                    <p>Record incoming stock movements</p>
                </Link>

                {/* ✅ Correction 3: Icône et texte corrects */}
                <Link to='/stock-exits' className='action-card'>
                    <span>📤</span>
                    <h3>Stock Exits</h3>
                    <p>Record outgoing stock movements</p>
                </Link>
            </div>
            
            <div className='recent-activities'>
                <h3>Recent Activities</h3>
                <div className='activities-list'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : recentActivities.length === 0 ? (
                        <div>No recent activities</div>
                    ) : (
                        recentActivities.map((activity, index) => (
                            <div key={index} className='activity-item'>
                                <div className='activity-icon'>
                                    {activity.type === 'entry' ? '📥' : '📤'}
                                </div>
                                <div className='activity-details'>
                                    <p>{activity.type === 'entry' ? 'Stock Entry' : 'Stock Exit'}</p>
                                    <small>{new Date(activity.date).toLocaleDateString()}</small>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;