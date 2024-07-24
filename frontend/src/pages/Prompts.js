import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles.css';

const Prompts = () => {
    const [prompts, setPrompts] = useState([]);
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterModel, setFilterModel] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchModels();
        fetchCategories();
        fetchPrompts();
    }, []);

    useEffect(() => {
        fetchPrompts();
    }, [filterModel, filterCategory, sortOrder, sortField]);

    const fetchPrompts = async () => {
        const response = await axiosInstance.get('prompts/', {
            params: {
                model: filterModel,
                category: filterCategory,
                sort: sortField,
                order: sortOrder,
            },
        });
        setPrompts(response.data);
    };

    const fetchModels = async () => {
        const response = await axiosInstance.get('models/');
        setModels(response.data);
    };

    const fetchCategories = async () => {
        const response = await axiosInstance.get('categories/');
        setCategories(response.data);
    };

    const handleSort = (field) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const clearFilters = () => {
        setFilterModel('');
        setFilterCategory('');
    };

    const handleRowClick = (id) => {
        navigate(`/edit-prompt/${id}`);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Prompts</h2>
                <h2>Prompts</h2>
                <div className="filter-container">
                    <button className="button" onClick={() => navigate('/add-prompt')}>Add Prompt</button>
                    <select className="filter-select" onChange={(e) => setFilterModel(e.target.value)} value={filterModel}>
                        <option value="">Filter by Model</option>
                        {models.map((model) => (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                    <select className="filter-select" onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
                        <option value="">Filter by Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button className="button" onClick={clearFilters} disabled={!filterModel && !filterCategory}>
                        Remove Filters
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>Name</th>
                            <th onClick={() => handleSort('text')}>Text</th>
                            <th onClick={() => handleSort('model')}>Model</th>
                            <th onClick={() => handleSort('categories')}>Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prompts.map((prompt) => (
                            <tr key={prompt.id} className="table-row" onClick={() => handleRowClick(prompt.id)}>
                                <td>{prompt.name}</td>
                                <td>{prompt.text}</td>
                                <td>{models.find(model => model.id === prompt.model)?.name || 'N/A'}</td>
                                <td>
                                    {prompt.categories && prompt.categories.length > 0
                                        ? prompt.categories.map((category) => category.name).join(', ')
                                        : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Prompts;
