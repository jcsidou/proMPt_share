import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddButton = ({ label, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };

    return (
        <button onClick={handleClick} style={{ margin: '10px', padding: '10px', background: 'blue', color: 'white' }}>
            Add {label}
        </button>
    );
};

export default AddButton;
