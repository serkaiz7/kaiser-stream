import React, { useState, useEffect, useCallback, createContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import WatchlistPage from './pages/WatchlistPage';
import PlayerPage from './pages/PlayerPage';

// Create a context to provide application state to all components
export const AppContext = createContext();

function App() {
    // State for navigation (custom router)
    const [page, setPage] = useState('home');
    const [pageData, setPageData] = useState({});
    
    // State for user authentication
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);

    // Effect to load user data and watchlist from localStorage on initial render
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('ks_user');
            const storedWatchlist = localStorage.getItem('ks_watchlist');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            if (storedWatchlist) {
                setWatchlist(JSON.parse(storedWatchlist));
            }
        } catch (e) {
            console.error("Failed to parse from localStorage", e);
            localStorage.removeItem('ks_user');
            localStorage.removeItem('ks_watchlist');
        }
    }, []);
    
    // --- Context Functions ---
    const login = useCallback((userData) => {
        setUser(userData);
        localStorage.setItem('ks_user', JSON.stringify(userData));
        setPage('home');
        setPageData({});
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setWatchlist([]);
        localStorage.removeItem('ks_user');
        localStorage.removeItem('ks_watchlist');
        setPage('home');
        setPageData({});
    }, []);

    const toggleWatchlist = useCallback((item) => {
        setWatchlist(current => {
            const isAdded = current.some(w => w.id === item.id);
            let newWatchlist;
            if (isAdded) {
                newWatchlist = current.filter(w => w.id !== item.id);
            } else {
                newWatchlist = [...current, {id: item.id, title: item.title || item.name, poster_path: item.poster_path, media_type: item.media_type}];
            }
            localStorage.setItem('ks_watchlist', JSON.stringify(newWatchlist));
            return newWatchlist;
        });
    }, []);
    
    const navigateTo = useCallback((newPage, data = {}) => {
        setPage(newPage);
        setPageData(data);
        if (newPage !== 'player') {
           window.scrollTo(0, 0);
        }
    }, []);

    // Function to determine which page component to render
    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'detail':
                return <DetailPage type={pageData.type} id={pageData.id} />;
            case 'category':
                return <CategoryPage type={pageData.type} />;
             case 'search':
                return <SearchResultsPage query={pageData.query} />;
            case 'login':
                 return <LoginPage />;
            case 'watchlist':
                 return user ? <WatchlistPage /> : <LoginPage />;
            case 'player':
                 return user ? <PlayerPage type={pageData.type} id={pageData.id} /> : <LoginPage />;
            default:
                return <HomePage />;
        }
    };
    
    const contextValue = {
        navigateTo,
        user,
        login,
        logout,
        watchlist,
        toggleWatchlist,
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="bg-gray-950 min-h-screen text-gray-100">
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700&display=swap');
                        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4F46E5; border-radius: 4px; }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366F1; }
                    `}
                </style>
                {page !== 'player' && <Header />}
                <div className={page !== 'player' ? 'pt-16 sm:pt-20' : ''}>
                   {renderPage()}
                </div>
                {page !== 'player' && <Footer />}
            </div>
        </AppContext.Provider>
    );
}

export default App;
