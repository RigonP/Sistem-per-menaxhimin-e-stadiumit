import React, { useState } from 'react';
import axios from 'axios';
import * as PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './Signup.css';


const api = axios.create({
    baseURL: 'http://localhost:8080/user',
});

function InputField(props) {
    const { label, name, value, onChange, required } = props;
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} required={required} style={{color:"black"}} />
        </div>
    );
}


InputField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool
};


function SuccessMessage() {
    return (
        <div style={{color:"black"}}>
            <p>Jeni regjistuar me sukses!</p>
        </div>
    );
}

function PasswordInput(props) {
    const { label, name, value, onChange, showPassword, setShowPassword, required } = props;
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={onChange} required={required} style={{color:"black"}} />
            <button style={{color:"black"}} type="button" onClick={() => setShowPassword(!showPassword)}>
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
const SignupForm = () => {
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
    const [emailError, setEmailError] = useState(false);

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
            return;
        }
        api.post('/signup', formData)
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

    const handleEmailBlur = () => {
        api.get('/email-exists/${formData.email}')
            .then((response) => {
                setEmailError(response.data.exists);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            {isSubmitted ? (
                <SuccessMessage />
            ) : (
                <div>
                    <h1 className="signin">Sign Up</h1>
                    <InputField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <InputField
                        label="Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        required
                    />
                    <InputField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleEmailBlur}
                        required
                    />
                    {emailError && (
                        <div className="error-message">This email is already registered.</div>
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
                    <PasswordInput
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        required
                    />
                    {passwordError && (
                        <div className="error-message">Passwords do not match.</div>
                    )}
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                    <div className="signup-link" style={{color:"black"}}>
                        Already have an account? <Link to="/login">log in</Link>
                    </div>
                </div>
            )}
        </form>
    );
};

export default SignupForm;