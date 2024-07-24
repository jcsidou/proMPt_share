import React, { useState } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles.css'; // Importando a folha de estilos

const AddRole = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('roles/', { name });
            console.log(response.data);
            navigate('/roles');
        } catch (error) {
            console.error(error);
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '60px' }}>
                <h2>Add Role</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-table">
                        <div className="form-row">
                            <div className="form-label">Name</div>
                            <div className="form-value">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-value">
                                <button type="submit" className="button">Add Role</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRole;
