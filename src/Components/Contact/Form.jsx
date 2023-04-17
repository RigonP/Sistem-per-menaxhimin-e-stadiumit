import './Form.css';
import { useState } from "react";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'


const Form = () => {
    const[data, setData] = useState({name: "", email: "", phone: "", message: ""});
    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(data);
    }

    return (
        <>
        <Navbar />
            <form method="post" onSubmit={handleSubmit}>
                <h1 className="contact-title">Contact<span className="contact-title-color">Us</span></h1>
                <div className="form-group">
                    <input type="text" name="name" id="" onChange={handleChange} value={data.name} placeholder='Enter name'/>
                </div>
                <div className="form-group">
                    <input type="email" name="email" id="" onChange={handleChange} value={data.email} placeholder='example@gmail.com'/>
                </div>
                <div className="form-group">
                    <input type="phone" name="phone" id="" onChange={handleChange} value={data.phone} placeholder='+383'/>
                </div>
                <div className="form-group">
                    <textarea name="message" id="" cols="30" onChange={handleChange} value={data.message} rows="10" placeholder='Type here'/>
                </div>
                <div className="form-group">
                    <button type='submit' className="btn-send">Send</button>
                </div>
            </form>
            <Footer />
        </>
    )
}

export default Form;
