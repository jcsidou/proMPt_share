import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles.css'; // Importando a folha de estilos

const Login = () => {
    const { loginUser } = useContext(AuthContext);

    return (
        <div className="login-container">
            <table className="login-table">
                <thead>
                    <tr className="login-header">
                        <th colSpan="2">
                            <h1>AI ProMPt Share</h1>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="login-content">
                        <td className="login-image">
                            <img src="/mp_digital.png" alt="MP Digital" />
                        </td>
                        <td className="login-form">
                            <form onSubmit={loginUser}>
                                <div className="form-row">
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" name="username" required className="form-input" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" required className="form-input" />
                                </div>
                                <div className="form-row button-row">
                                    <button type="submit" className="button">Login</button>
                                </div>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Login;
