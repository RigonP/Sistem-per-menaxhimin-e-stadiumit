import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';



const SignupForm = () => {
    const api = axios.create({
        baseURL: 'http://localhost:8080/user',
    });


    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true);
        } else {
            api
                .post('/signup', formData)
                .then((response) => {
                    console.log(response.data);
                    setIsSubmitted(true);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            {isSubmitted ? (
                <div className="success-message">You have successfully signed up!</div>
            ) : (


                <div>
                    <div>
                        <h1 className="signin">Sign in</h1>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contactNumber">Contact Number</label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            required
                        />
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
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
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
                    {passwordError && (
                        <div className="error-message">Passwords do not match</div>
                    )}
                    <button type="submit">Sign Up</button>


                </div>
            )}
        </form>
    );
};

export default SignupForm;
