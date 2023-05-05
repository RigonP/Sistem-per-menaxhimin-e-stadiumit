import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import * as PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {MdOutlineStadium} from "react-icons/md";


const api = axios.create({
    baseURL: 'http://localhost:8080/user',
});

function InputField(props) {
    const { label, name, value, onChange, required } = props;
    return (
        <div className="input-field" >
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} required={required} style={{color:"black"}} />
        </div>
    );
}

function SuccessMessage() {
    return (
        <div style={{color:"black"}}>
            <p>Jeni kyqur me sukses!</p>
        </div>
    );
}

function PasswordInput(props) {
    const { label, name, value, onChange, showPassword, setShowPassword, required } = props;
    return (
        <div className="input-field" >
            <label htmlFor={name}>{label}</label>
            <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={onChange} required={required} style={{color:"black"}} />
            <button className="showhidebuttonlogin" type="button" style={{fontSize : "13px" , paddingTop:"3px"}} onClick={() => setShowPassword(!showPassword)}>
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

const Header = () => {
    return (
        <div className="header" style={{position:"relative" , margin : "auto"}} >
            <div className="logoDiv">
                <Link to="/" className="logo flex" >
                    <h1><MdOutlineStadium className="icon"/> Kosovo Stadium.</h1>
                </Link>
            </div>
        </div>
    );
}

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
    <div>
        <div>
            <Header/>
        </div>
        <form onSubmit={handleSubmit} className="signup-form" style={{marginTop : "100px" , marginBottom : "0px"}}>

            {isSubmitted ? (
                <SuccessMessage />
            ) : (
                <div>
                    <h1 className="signin" style={{fontWeight : "bold" , paddingBottom : "30px" , paddingTop:"20px"}}>Log in</h1>
                    <InputField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
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
                    <button type="submit" className="signup-button" style={{marginBottom : "10px" , marginTop : "5px"}}>
                        Log In
                    </button>

                    <div className="forgot-link" style={{fontSize : "14px"}}>
                        <Link to="/forgotPassword"> Forgot Password? </Link>
                    </div>

                    <div className="signup-link" style={{color:"black"}}>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            )}
        </form>

        <div>
            <Footer/>
        </div>


    </div>
    );
};

export default LoginForm;
