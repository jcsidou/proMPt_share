import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import Navbar from '../components/Navbar';
import '../styles.css'; // Importando a folha de estilos

const Models = () => {
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('models/').then((response) => {
            setModels(response.data);
        });
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-model/${id}`);
    };

    const handleAddModel = () => {
        navigate('/add-model');
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '60px' }}>
                <h2>Models</h2>
                <button className="button" onClick={handleAddModel}>Add Model</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((model) => (
                            <tr key={model.id} onClick={() => handleRowClick(model.id)} className="table-row">
                                <td>{model.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Models;
