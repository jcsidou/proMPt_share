import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import Navbar from '../components/Navbar';
import '../styles.css';

const EditPrompt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState({});
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [jsonFile, setJsonFile] = useState(null);

    useEffect(() => {
        fetchPrompt();
        fetchModels();
        fetchCategories();
    }, []);

    const fetchPrompt = async () => {
        try {
            const response = await axiosInstance.get(`prompts/${id}/`);
            setPrompt(response.data);
            setSelectedCategories(response.data.categories.map(category => category.id) || []);
        } catch (error) {
            console.error('Error fetching prompt:', error);
        }
    };

    const fetchModels = async () => {
        try {
            const response = await axiosInstance.get('models/');
            setModels(response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('categories/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        setPrompt({
            ...prompt,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedCategories(value);
    };

    const handleJsonFileChange = (e) => {
        setJsonFile(e.target.files[0]);
    };

    const handleTemperatureChange = (e) => {
        setPrompt({
            ...prompt,
            temperature: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', prompt.name);
        formData.append('text', prompt.text || '');
        formData.append('model', prompt.model);
        formData.append('temperature', prompt.temperature || '');
        selectedCategories.forEach(categoryId => formData.append('category_ids', categoryId));
        if (jsonFile) {
            formData.append('json_file', jsonFile);
        }

        try {
            await axiosInstance.put(`prompts/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/prompts');
        } catch (error) {
            console.error('Error updating prompt:', error);
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Edit Prompt</h2>
                <form onSubmit={handleSubmit} className="form-table">
                    <div className="form-row">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={prompt.name || ''}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="text">Text:</label>
                        <textarea
                            id="text"
                            name="text"
                            value={prompt.text || ''}
                            onChange={handleChange}
                            className="form-input fixed-textarea"
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="model">Model:</label>
                        <select
                            id="model"
                            name="model"
                            value={prompt.model || ''}
                            onChange={handleChange}
                            required
                            className="form-input"
                        >
                            <option value="">Select a model</option>
                            {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor="temperature">Temperature:</label>
                        <input
                            type="range"
                            id="temperature"
                            name="temperature"
                            min="0"
                            max="2"
                            step="0.1"
                            value={prompt.temperature || 0}
                            onChange={handleTemperatureChange}
                            className="form-input"
                        />
                        <div className="temperature-value">{prompt.temperature}</div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="categories">Categories:</label>
                        <select
                            id="categories"
                            name="categories"
                            multiple
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                            className="form-input fixed-select"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor="json_file">JSON File:</label>
                        <input
                            type="file"
                            id="json_file"
                            name="json_file"
                            accept="application/json"
                            onChange={handleJsonFileChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-row button-row">
                        <button type="submit" className="button">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPrompt;
