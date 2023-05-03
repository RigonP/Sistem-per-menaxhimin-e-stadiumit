// import React, { useState } from "react";
// import axios from "axios";

// function ForgotPasswordPage() {
//     const [email, setEmail] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios
//             .post("http://localhost:8080/user/forgotPassword",
//                 { email }, { withCredentials: true })
//             .then((res) => {
//                 if (res.status === 200) {
//                     setSuccessMessage(
//                         "Shikoni ju lutem ne emailin tuaj, per te shikuar passwordin"
//                     );
//                 }
//             })
//             .catch((err) => {
//                 setErrorMessage(
//                     "Dicka shkoi gabim. Ju lutem provoni përsëri ose regjistrohuni."
//                 );
//             });
//     };


//     return (
//         <div>
//             <h1>Keni harruar fjalëkalimin?</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <br />
//                 <button type="submit">Dërgo</button>
//             </form>
//             {errorMessage && <p>{errorMessage}</p>}
//             {successMessage && <p>{successMessage}</p>}
//         </div>
//     );
// }
// export default ForgotPasswordPage
