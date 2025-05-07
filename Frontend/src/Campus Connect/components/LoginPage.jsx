import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.endsWith('@vvit.net')) {
            setError('Please enter a valid @vvit.net email address.');
            return;
        }

        try {
            const result = await axios.post("${process.env.REACT_APP_API_BASE_URL}/api/users/login", { email, password },
             {withCredentials:true}
            );
            console.log("result", result);

            toast.success("Login Success", {
                onClose: () => {
                    navigate("/Home");
                },
            });
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-form-group">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="login-input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <div className="login-password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="login-input"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="login-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" className="login-button">Login</button>

                    <div className="login-options">
                        <p>
                            Forgot your password? <a href="/forgot-password" className="login-link">Click here</a>
                        </p>
                        <p>
                            New user? <a href="/register" className="login-link">Register now</a>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />

            <style>{`
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f9;
                }
                .login-box {
                    width: 100%;
                    max-width: 400px;
                    padding: 20px;
                    border-radius: 8px;
                    background: #fff;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                .login-title {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                }
                .login-form-group {
                    margin-bottom: 15px;
                }
                .login-label {
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 5px;
                    display: block;
                }
                .login-input {
                    width: 95%;
                    padding: 10px;
                    border: 1px solid #d57465;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .login-password-wrapper {
                    position: relative;
                }
                .login-icon {
                    position: absolute;
                    right: 25px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: black;
                    font-size: 20px;
                }
                .login-button {
                    background-color: #d57465;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: background-color 0.3s ease;
                }
                .login-button:hover {
                    background-color: #000;
                }
                .login-options {
                    margin-top: 10px;
                    text-align: center;
                    font-size: 14px;
                }
                .login-link {
                    color: #d57465;
                    text-decoration: underline;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                .login-error {
                    color: red;
                    font-size: 14px;
                    text-align: center;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
