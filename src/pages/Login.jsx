import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Login() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carga
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Iniciar carga
        
        const url = import.meta.env.VITE_SERVER_URL;
        
        try {
            const response = await axios.post(url + "/api/auth/login/", formData);
            if (response.data && response.data.token) {
                login(response.data.token);
                navigate('/commands');
            }
            setFormData({ email: '', password: '' });
            setMessage('');
        } catch (error) {
            console.log(JSON.parse(error.request.response).message);
            setFormData(prev => ({ ...prev, password: '' }));
            setMessage(JSON.parse(error.request.response).message);
        } finally {
            setLoading(false); // Finalizar carga (éxito o error)
        }    
    };

    return (
        <div className="page-container">
            <h2>Login</h2>
            <p>Por favor introducir los datos correspondientes</p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading} // Opcional: deshabilitar inputs
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading} // Opcional: deshabilitar inputs
                    />
                </div>

                <div className="form-group form-error">{message}</div>
                
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading} // Deshabilitar botón durante carga
                >
                    {loading ? 'Iniciando sesión...' : 'Login'} {/* Texto dinámico */}
                </button>
            </form>
        </div>
    );
}