import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() => 
        localStorage.getItem('authTokens') ? JSON.parse(atob(localStorage.getItem('authTokens').split('.')[1])) : null
    );
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        console.log('Login attempt with username:', e.target.username.value);
        try {
            const response = await axiosInstance.post('token/', {
                username: e.target.username.value,
                password: e.target.password.value,
            });
            console.log('Login response:', response);
            if (response.status === 200) {
                setAuthTokens(response.data);
                const userFromToken = JSON.parse(atob(response.data.access.split('.')[1]));
                setUser(userFromToken);
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                localStorage.setItem('refresh_token', response.data.refresh); // Certifique-se de armazenar o refresh token
                console.log('Login successful, setting user and tokens:', userFromToken);
                navigate('/prompts');
            } else {
                console.error('Login failed:', response.status, response.statusText);
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };

    const logoutUser = () => {
        console.log('Logging out user');
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('refresh_token'); // Remover o refresh token ao fazer logout
        console.log('Tokens cleared, navigating to login.');
        navigate('/login');
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        console.log('AuthTokens changed:', authTokens);
        if (authTokens) {
            const userFromToken = JSON.parse(atob(authTokens.access.split('.')[1]));
            setUser(userFromToken);
            console.log('User set from token:', userFromToken);
        }
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
