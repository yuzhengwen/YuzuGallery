import '../../styles/NavBar.css';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className='navbar'>
            <a href='/' className='navbar-brand'>Yuzu Gallery</a>
            <ul className='navbar-nav'>
                {isAuthenticated ? <li className='user-welcome'>Welcome, {user}</li> : ''}
                <li className='nav-item'>
                    <a href='/favourites' className='nav-link'>Favourites</a>
                </li>
                <li className='nav-item'>
                    <a href='/upload' className='nav-link'>Upload</a>
                </li>
                {isAuthenticated ? (
                    <li className='nav-item' onClick={handleLogout}>
                        <a className='nav-link'>Logout</a>
                    </li>
                ) : (
                    <>
                        <li className='nav-item'>
                            <a href='/login' className='nav-link'>Login</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
export default App;