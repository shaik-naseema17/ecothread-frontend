import React, { useState } from 'react';
import './NewLogin.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import NewNavbar from './NewNavBar';

const NewLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            console.error("Validation Error: Both fields are required");
            return;
        }

        try {
            const response = await axios.post(
                'https://ecothread-backend.vercel.app/auth/login',
                { email, password },
                { withCredentials: true } // ✅ Send cookie
            );

            if (response.data.status) {
                alert("Login successful!");
                navigate(response.data.role === 'admin' ? "/admin" : "/items");
            } else {
                console.error(response.data.message || "Login failed");
                alert(response.data.message || "Login failed");
            }
        } catch (err) {
            console.error("Error during login:", err.response?.data || err.message);
            alert("Internal server error. Please try again later.");
        }
    };

    return (
        <>
            <NewNavbar />
            <div className="newlogin-container">
                <form className="newlogin-form" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>

                    <p>Don't have an account? <Link to="/newsignup">Signup</Link></p>
                </form>
            </div>
        </>
    );
};

export default NewLogin;
