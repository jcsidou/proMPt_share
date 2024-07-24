import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import '../styles.css'; // Importando a folha de estilos

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.error('No refresh token available');
            return;
        }
        axiosInstance.post('logout/', {
            refresh_token: refreshToken,
        }).then(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            navigate('/login');
        }).catch((error) => {
            console.error('Error during logout:', error);
        });
    };

    return (
        <div className="navbar">
            <button className="nav-button" onClick={() => navigate('/prompts')}>Prompts</button>
            <div className="dropdown">
                <button className="nav-button dropbtn">Manage
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <button className="nav-button dropdown-item" onClick={() => navigate('/categories')}>Categories</button>
                    <button className="nav-button dropdown-item" onClick={() => navigate('/models')}>Models</button>
                    <button className="nav-button dropdown-item" onClick={() => navigate('/roles')}>Roles</button>
                </div>
            </div>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
            <img src="/mp_digital.png" alt="Background" className="background-image" />
        </div>
    );
};

export default Navbar;
