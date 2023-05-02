import React, { useState } from "react";
import axios from "axios";
import './changepass.css';

function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8080/user/changePassword",
                { oldPassword, newPassword },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.status === 200) {
                    setErrorMessage("Passwordi u ndryshua me sukses!");
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setErrorMessage("Passwordi i vjeter eshte gabim");
                } else {
                    setErrorMessage("Dicka shkoi gabim. Ju lutem provoni përsëri.");
                }
            });
    };

    return (
        <div>
            <h1>Ndrysho fjalëkalimin</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="oldPassword">Fjalëkalimi i vjetër:</label>
                <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="newPassword">Fjalëkalimi i ri:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Ndrysho</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
export default ChangePasswordPage;
