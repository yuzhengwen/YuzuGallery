import React, { createContext, useState, useContext, useEffect } from 'react';
import { DRF_TOKEN } from './constants';
import api from './api/api';
import {useNavigate} from 'react-router-dom';

// creates a new context with default value of an empty object
const AuthContext = createContext();

// custom hook that returns the current context value
export const useAuth = () => useContext(AuthContext);

// component that wraps the entire application and provides authentication context to its children
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');

    const fetchUser = async () => {
        try {
            const response = await api.get('/user/');
            setUser(response.data.username);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        const token = localStorage.getItem(DRF_TOKEN);
        setIsAuthenticated(!!token);  // Set authentication status based on token
        if (!!token) fetchUser();
        setLoading(false);
        console.log('AuthContext - isAuthenticated:', !!token);
    }, []);

    const login = (token) => {
        localStorage.setItem(DRF_TOKEN, token);
        setIsAuthenticated(true);
        fetchUser();
        console.log('Logged in');
    };

    const logout = () => {
        localStorage.removeItem(DRF_TOKEN);
        setIsAuthenticated(false);
        console.log('Logged out');
    };

    if (loading) {
        return <div>Loading...</div>;  // Show a loading indicator while determining authentication status
    }
    return (
        // all children of AuthProvider will have access to the value prop
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};