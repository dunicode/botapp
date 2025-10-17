import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Login() {
    const [message, setMessage] = useState('');
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
        
        await axios.post("http://localhost:8000/api/auth/login/", formData)
        .then(function (response) {
            if (response.data && response.data.token) {
                login(response.data.token);
                navigate('/commands');
            }
            setFormData({ email: '', password: '' });
            setMessage('');
        }).catch(function (error) {
            console.log(JSON.parse(error.request.response).message);
            setFormData({ email: formData.email, password: '' });
            setMessage(JSON.parse(error.request.response).message);
        });     
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
                    />
                </div>

                <div className="form-group form-error">{message}</div>
                
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
}
