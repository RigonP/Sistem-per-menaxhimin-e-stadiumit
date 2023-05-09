import React, { useState } from "react";
import axios from "axios";
import './ForgotPassword.css';
import {Link} from "react-router-dom";
import {MdOutlineStadium} from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        axios
            .post("http://localhost:8080/user/forgotPassword", { email })
            .then((res) => {
                if (res.status === 200) {
                    setSuccessMessage(res.data);
                    setErrorMessage("Kontrolloni emailin tuaj");
                }
            })
            .catch((err) => {
                setErrorMessage (
                    "Dicka shkoi gabim. Ju lutem provoni përsëri ose regjistrohuni."
                );
                setSuccessMessage("");
            });
    };

    return (
        <div>
            <div>
                <Header/>
            </div>
            {errorMessage && <p className="error" style={{display : "flex",margin:"auto",paddingBottom:"50px",alignItems:"center",justifyContent:"center"}}>{errorMessage.message}</p>}
            {successMessage && <p className="success" style={{border:"solid" , borderWidth: "2px",borderStyle:"double",height: "5vh",width:"80vh" ,marginBottom:"20px",display : "flex",margin:"auto",alignItems:"center",justifyContent:"center"}}>{successMessage.message}</p>}
        <div>
            <h1 style={{display : "flex" ,margin : "auto", alignItems: "center", justifyContent : "center" , marginTop : "100px" , marginBottom : "0px"}}>Keni harruar fjalëkalimin?</h1>
            <form className="formaForgot" style={{borderColor : "aliceblue" , borderWidth : "25px" ,borderStyle : "dashed"  ,display : "flex" , flexDirection : "column" , alignItems: "center" , justifyContent : "center" , height : "50vh" ,width : "50vh" , margin : "auto"}} onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Dërgo fjalëkalimin</button>
                <div style={{color:"black" ,paddingTop : "20px" , paddingBottom : "10px"}}>
                     <Link to="/login">Më rikthe në Log in</Link>
                </div>
            </form>

        </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
