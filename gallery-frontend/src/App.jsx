import './App.css'
import '../styles/gallery.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Gallery from './pages/Gallery'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import { AuthProvider } from './AuthContext'
import Favourites from './pages/Favourites'
import ProtectedRoute from './components/ProtectedRoute'
import UploadForm from './components/UploadForm'

function App() {
  //<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
  //  <Route path="*" element={<NotFound />} />
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<ProtectedRoute><UploadForm /></ProtectedRoute>} />
          <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
