import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineStadium } from 'react-icons/md';
import api from '../Utils/api';
import { AuthContext } from '../Authentication/AuthContext';
import Cookies from 'js-cookie';





function InputField(props) {
    const { label, name, value, onChange, required } = props;
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} required={required} style={{ color: 'black' }} />
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
};

function SuccessMessage() {
    return (
        <div style={{ color: 'black' }}>
            <p>Jeni kyqur me sukses!</p>
        </div>
    );
}

function PasswordInput(props) {
    const { label, name, value, onChange, showPassword, setShowPassword, required } = props;
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input type={showPassword ? 'text' : 'password'} name={name} value={value} onChange={onChange} required={required} style={{ color: 'black' }} />
            <button
                className="showhidebuttonlogin"
                type="button"
                style={{ fontSize: '13px', paddingTop: '3px' }}
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
    );
}

PasswordInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    showPassword: PropTypes.bool,
    setShowPassword: PropTypes.func,
    required: PropTypes.bool,
};

const Header = () => {
    return (
        <div className="header" style={{ position: 'relative', margin: 'auto' }}>
            <div className="logoDiv">
                <Link to="/" className="logo flex">
                    <h1>
                        <MdOutlineStadium className="icon" /> Kosovo Stadium.
                    </h1>
                </Link>
            </div>
        </div>
    );
};

const Footer = () => {
    return(
        <div className="footer" style={{marginBottom : "0px" ,paddingBottom : "0px"}}>
            <div className="footer" style={{marginBottom : "0px" , paddingBottom: "35px"}}>
                <div className="links" style={{margin : "auto"}}>
                    <a href="#" style={{margin:"auto"}}>Stadium</a>
                    <a href="#" style={{marginLeft:"30px"}}>About</a>
                    <a href="#" style={{marginLeft:"30px"}}>Blog</a>
                    <a href="#" style={{marginLeft:"30px"}}>Jobs</a>
                    <a href="#" style={{marginLeft:"30px"}}>Help</a>
                    <a href="#" style={{marginLeft:"30px"}}>API</a>
                    <a href="#" style={{marginLeft:"30px"}}>Privacy</a>
                    <a href="#" style={{marginLeft:"30px"}}>Terms</a>
                    <a href="#" style={{marginLeft:"30px"}}>Top Accounts</a>
                    <a href="#" style={{marginLeft:"30px"}}>Locations</a>
                    <a href="#" style={{marginLeft:"30px"}}>Meta Verified</a>
                </div>
            </div>
        </div>

    );
}

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [errors, setErrors] = useState({
        email: '',
        password: 'Sorry, your password was incorrect. Please double-check your password.',

    });
    const validateForm = () => {
        let isValid = true;
        const updatedErrors = { ...errors };

        // Validate email
        if (!formData.email) {
            updatedErrors.email = 'Email is required.';
            isValid = false;
        } else {
            updatedErrors.email = '';
        }

        // Validate password
        if (!formData.password) {
            updatedErrors.password = 'Password is required.';
            isValid = false;
        } else {
            updatedErrors.password = '';
        }

        setErrors(updatedErrors);
        return isValid;
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [passwordError, setPasswordError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nonExistingUserError, setNonExistingUserError] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const saveLoginStatus = () => {
        localStorage.setItem('isLoggedIn', true);
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setNonExistingUserError(false);

        if (!validateForm()) {
            return; // If the form is not valid, don't submit it
        }
        try {
            const response = await api.post('http://localhost:8080/user/login', formData);
            console.log(response.data);
            setIsSubmitted(true);
            saveLoginStatus();
            const { token } = response.data;
            Cookies.set('token', token, { secure: true, sameSite: 'strict' }); // Store the token as a cookie
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the Authorization header
            login(); // Call the login method from the AuthContext to update the authentication state
            navigate('/'); // Redirect to the desired page after successful login
        } catch (error) {
            console.log(error.response.data);
            if (error.response.status === 404) {
                setNonExistingUserError(true);
            } else if (error.response.status === 401) {
                setPasswordError(true);
                setTimeout(() => {
                    setPasswordError(null);
                }, 3000); // Hide success message after 3 seconds
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);


    return (
        <div>
            <Header />

            {errors.password && (
                <div className="error-message" style={{display : "flex" ,margin : "auto", alignItems: "center", justifyContent : "center" , marginTop : "100px" , marginBottom : "0px",fontSize: '15px', color: 'red' }}>
                    {/*{errors.password}*/}
                </div>
            )}
            <form onSubmit={handleSubmit} className="signup-form" style={{ marginTop: '10px',marginBottom:"0px" }}>
                <div>
                    <h1 className="signin" style={{ fontWeight: 'bold', paddingBottom: '30px', paddingTop: '20px' }}>
                        Log in
                    </h1>
                    {/* Input fields */}
                    <InputField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required />
                    {errors.email &&  (
                        <div className="error-message" style={{ fontSize: '12px', color: 'red' }}>
                            {errors.email}
                        </div>
                    )}
                    {/* Password input */}
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        required
                    />

                    {/* Submit button */}
                    <button type="submit" className="signup-button" style={{ marginBottom: '10px', marginTop: '5px' }}>
                        Log In
                    </button>
                    {/* Forgot password link */}
                    <div className="forgot-link" style={{ fontSize: '14px' }}>
                        <Link to="/forgotPassword"> Forgot Password? </Link>
                    </div>
                    {/* Sign up link */}
                    <div className="signup-link" style={{ color: 'black', fontSize: '14px' }}>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default LoginForm;
