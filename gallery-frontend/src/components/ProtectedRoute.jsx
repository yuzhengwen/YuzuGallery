import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();    

    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    return isAuthenticated ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;