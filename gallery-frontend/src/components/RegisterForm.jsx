import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Form.css"
import api from '../api/api';
import { DRF_TOKEN } from '../constants';
//import LoadingIndicator from '../components/LoadingIndicator';

function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // this is a hook that allows us to navigate to different routes
    const route = '/register/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post(route, { username, password });
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
                <h1>Register</h1>
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
                <button className='submit-button' type="submit">Register</button>
                <span className='form-footer-text'>Already have an account? <a href='/login'>Login</a></span>
                {error && <div>{error}</div>}
            </div>
        </form>
    );
    //{loading && <LoadingIndicator />}
}

export default Form;