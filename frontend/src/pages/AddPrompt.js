import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles.css'; // Importando a folha de estilos

const AddPrompt = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [model, setModel] = useState('');
    const [temperature, setTemperature] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [jsonFile, setJsonFile] = useState(null);
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('models/').then((response) => {
            setModels(response.data);
        });

        axiosInstance.get('categories/').then((response) => {
            setCategories(response.data);
        });
    }, []);

    const handleCategoryChange = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedCategories(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('text', text);
        formData.append('model', model);
        if (temperature) formData.append('temperature', temperature);
        // if (selectedCategories.length > 0) {
        //     // Enviar categorias como uma lista de IDs
        //     selectedCategories.forEach((category) => {
        //         formData.append('categories', category);
        //     });
        // }
        selectedCategories.forEach(categoryId => formData.append('category_ids', categoryId));
        if (jsonFile) formData.append('json_file', jsonFile);

        // Log dos dados antes do envio
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axiosInstance.post('prompts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response);
            navigate('/prompts');
        } catch (error) {
            console.error('Error:', error);
            console.log('Error Response Data:', error.response.data); // Log detalhado do erro de resposta
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '60px' }}>
                <h2>Add Prompt</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-table">
                        <div className="form-row">
                            <div className="form-label">Name</div>
                            <div className="form-value">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-label">Text</div>
                            <div className="form-value">
                                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-label">Model</div>
                            <div className="form-value">
                                <select value={model} onChange={(e) => setModel(e.target.value)} required>
                                    <option value="">Select Model</option>
                                    {models.map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-label">Temperature</div>
                            <div className="form-value">
                                <input
                                    type="number"
                                    value={temperature}
                                    onChange={(e) => setTemperature(e.target.value)}
                                    min="0"
                                    max="2"
                                    step="0.1"
                                />
                            </div>
                        </div>
                        <div class="form-row">
                            <div className="form-label">Categories</div>
                            <div className="form-value">
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
                        </div>
                        <div className="form-row">
                            <div className="form-label">JSON File</div>
                            <div className="form-value">
                                <input type="file" onChange={(e) => setJsonFile(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-value">
                                <button type="submit" className="button">Add Prompt</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPrompt;
