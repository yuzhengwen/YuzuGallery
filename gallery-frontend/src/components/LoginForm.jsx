import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Form.css"
import api from '../api/api';
import { DRF_TOKEN } from '../constants';
import { useAuth } from '../AuthContext';
//import LoadingIndicator from '../components/LoadingIndicator';

function Form() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const loginRoute = '/obtain-token/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post(loginRoute, { username, password });
            localStorage.setItem(DRF_TOKEN, response.data.token);
            login(response.data.token);
            console.log("Login successful");
            navigate('/');
        } catch (error) {
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-container'>
                <h1>Login</h1>
                <input
                    value={username}
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    value={password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='submit-button' type="submit">Login</button>
                <span className='form-footer-text'>Don't have an account? <a href='/register'>Register</a></span>
                {error && <div>{error}</div>}
            </div>
        </form>
    );
    //{loading && <LoadingIndicator />}
}

export default Form;