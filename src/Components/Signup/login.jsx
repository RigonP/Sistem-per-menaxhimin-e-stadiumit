import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const LoginForm = () => {
    const api = axios.create({
        baseURL: 'http://localhost:8080/user',
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');


    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        api
            .post('/login', formData)
            .then((response) => {
                console.log(response.data);
                setIsSubmitted(true);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            {isSubmitted ? (
                <div className="success-message">You have successfully logged in!</div>
            ) : (
                <div>
                    <div>
                        <h1 className="signin">Sign in</h1>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button type="submit">Log In</button>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
