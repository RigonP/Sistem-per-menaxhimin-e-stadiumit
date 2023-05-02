import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import * as PropTypes from "prop-types";

const api = axios.create({
    baseURL: 'http://localhost:8080/user',
});

function InputField(props) {
    const { label, name, value, onChange, required } = props;
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} required={required} />
        </div>
    );
}

function SuccessMessage() {
    return (
        <div>
            <p>Jeni kyqur me sukses!</p>
        </div>
    );
}

function PasswordInput(props) {
    const { label, name, value, onChange, showPassword, setShowPassword, required } = props;
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={onChange} required={required} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    );
}

PasswordInput.propTypes = {
    onChange: PropTypes.func,
    setShowPassword: PropTypes.func,
    name: PropTypes.string,
    showPassword: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool
};


const LoginForm = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [passwordError, setPasswordError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);


    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        api.post('/login', formData)
            .then((response) => {
                console.log(response.data);
                setIsSubmitted(true);
            })
            .catch((error) => {
                console.log(error.response.data);
                if (error.response.status === 409) {
                    setEmailError(true);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            {isSubmitted ? (
                <SuccessMessage />
            ) : (
                <div>
                    <h1 className="signin">Log In</h1>
                    <InputField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {emailError && (
                        <div className="error-message">This email is not registered.</div>
                    )}
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        required
                    />
                    <button type="submit" className="signup-button">
                        Log In
                    </button>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
