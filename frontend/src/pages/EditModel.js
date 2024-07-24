import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import Navbar from '../components/Navbar';
import '../styles.css';

const EditModel = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`models/${id}/`).then((response) => {
            setName(response.data.name);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`models/${id}/`, { name });
            console.log(response.data);
            navigate('/models');
        } catch (error) {
            console.error(error);
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '60px' }}>
                <h2>Edit Model</h2>
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
                                <button type="submit" className="button">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModel;
