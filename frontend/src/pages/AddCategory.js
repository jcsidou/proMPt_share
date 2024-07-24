import React, { useState } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Importar Navbar

const AddCategory = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('categories/', { name });
            navigate('/categories');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '60px' }}>
                <h2>Add Category</h2>
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
                                <button type="submit" className="button">Add Category</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
