import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Prompts from './pages/Prompts';
import AddPrompt from './pages/AddPrompt.js';
import EditPrompt from './pages/EditPrompt';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import Models from './pages/Models';
import AddModel from './pages/AddModel';
import EditModel from './pages/EditModel';
import Roles from './pages/Roles';
import AddRole from './pages/AddRole';
import EditRole from './pages/EditRole';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <>
        {!isLoginPage && <Navbar />}
        <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/prompts" element={<Prompts />} />
                    <Route path="/add-prompt" element={<AddPrompt />} />
                    <Route path="/edit-prompt/:id" element={<EditPrompt />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/edit-category/:id" element={<EditCategory />} />
                    <Route path="/models" element={<Models />} />
                    <Route path="/add-model" element={<AddModel />} />
                    <Route path="/edit-model/:id" element={<EditModel />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/add-role" element={<AddRole />} />
                    <Route path="/edit-role/:id" element={<EditRole />} />
                </Route>
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
};

export default App;
