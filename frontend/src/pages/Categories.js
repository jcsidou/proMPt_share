import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import Navbar from '../components/Navbar';
import '../styles.css'; // Importando a folha de estilos

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('categories/').then((response) => {
            setCategories(response.data);
        });
    }, []);

    const handleRowClick = (id) => {
        navigate(`/edit-category/${id}`);
    };

    const handleAddCategory = () => {
        navigate('/add-category');
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '60px' }}>
                <h2>Categories</h2>
                <button className="button" onClick={handleAddCategory}>Add Category</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} onClick={() => handleRowClick(category.id)} className="table-row">
                                <td>{category.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
