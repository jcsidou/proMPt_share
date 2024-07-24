import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import Navbar from '../components/Navbar';
import '../styles.css'; // Importando a folha de estilos

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('roles/').then((response) => {
            setRoles(response.data);
        });
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-role/${id}`);
    };

    const handleAddRole = () => {
        navigate('/add-role');
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '60px' }}>
                <h2>Roles</h2>
                <button className="button" onClick={handleAddRole}>Add Role</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id} onClick={() => handleRowClick(role.id)} className="table-row">
                                <td>{role.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Roles;
