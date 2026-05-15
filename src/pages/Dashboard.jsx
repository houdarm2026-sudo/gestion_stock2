import { FiPackage, FiDownload, FiUpload, FiDollarSign ,} from 'react-icons/fi';
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

            const articleRes = await api.get('/articles');
            const articles = articleRes.data;

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
                ...entries.slice(0, 5).map(e => ({ type: 'entry', data: e, date: e.date_entree })),
                ...exits.slice(0, 5).map(s => ({ type: 'exit', data: s, date: s.date_sortie }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
            
            setRecentActivities(activities);
        
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className='dashboard'>
            {/* Stats Cards */}
            <div className='stats-grid-dashboard'>
                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>
                        <FiPackage size={32} />
                    </div>
                    <div className='stat-info-dashboard'>
                        <h3>{stats.articles.toLocaleString()}</h3>
                        <p>Total Articles</p>
                    </div>
                </div>

                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>
                        <FiDownload size={32} />
                    </div>
                    <div className='stat-info-dashboard'>
                        <h3>{stats.entries.toLocaleString()}</h3>
                        <p>Stock Entries</p>
                    </div>
                </div>

                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>
                        <FiUpload size={32} />
                    </div>
                    <div className='stat-info-dashboard'>
                        <h3>{stats.exits.toLocaleString()}</h3>
                        <p>Stock Exits</p>
                    </div>
                </div>

                <div className='stat-card-dashboard'>
                    <div className='stat-icon-dashboard'>
                       Dh
                    </div>
                    <div className='stat-info-dashboard'>
                        <h3>{stats.totalStockValue.toLocaleString()} </h3>
                        <p>Total Stock Value</p>
                    </div>
                </div>
            </div>
            
            {/* Action Cards */}
            <div className='dashboard-actions'>
                <Link to='/articles' className='action-card'>
                    <span><FiPackage size={48} /></span>
                    <h3>Manage Articles</h3>
                    <p>View, add, edit or delete articles</p>
                </Link>

                <Link to='/stock-entries' className='action-card'>
                    <span><FiDownload size={48} /></span>
                    <h3>Stock Entries</h3>
                    <p>Record incoming stock movements</p>
                </Link>

                <Link to='/stock-exits' className='action-card'>
                    <span><FiUpload size={48} /></span>
                    <h3>Stock Exits</h3>
                    <p>Record outgoing stock movements</p>
                </Link>
            </div>
            
            {/* Recent Activities */}
            <div className='recent-activities'>
                <h3> Recent Activities</h3>
                <div className='activities-list'>
                    {loading ? (
                        <div className="loading-spinner">⏳ Loading activities...</div>
                    ) : recentActivities.length === 0 ? (
                        <div className="empty-activities">No recent activities</div>
                    ) : (
                        recentActivities.map((activity, index) => (
                            <div key={index} className='activity-item'>
                                <div className='activity-icon'>
                                    {activity.type === 'entry' ? '📥' : '📤'}
                                </div>
                                <div className='activity-details'>
                                    <p>{activity.type === 'entry' ? 'Stock Entry' : 'Stock Exit'}</p>
                                    <small>{new Date(activity.date).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</small>
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