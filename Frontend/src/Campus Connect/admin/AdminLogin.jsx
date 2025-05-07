import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isHovered, setIsHovered] = useState(false);
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
            const result = await axios.post("${process.env.REACT_APP_API_BASE_URL}/api/admins/login", { email, password });
                        console.log("result", result);

            toast.success("Login Success", {
                onClose: () => {
                    navigate("/AdminHome");
                },
            });
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h2 style={styles.title}>Admin Login</h2>
                <form style={styles.form} onSubmit={handleLogin}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            style={styles.input}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <div style={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                style={styles.input}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                style={styles.icon}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {error && <div style={styles.error}>{error}</div>}

                    <button
                        type="submit"
                        style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Login
                    </button>

                    <div style={{ ...styles.loginOptions, marginTop: '20px' }}>
                        <p style={{ color: 'black' }}>
                            Forgot your password?{' '}
                            <a href="/forgot-password" style={styles.link}>Click here</a>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
    },
    loginBox: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #d57465',
        borderRadius: '5px',
        fontSize: '16px',
    },
    passwordContainer: {
        position: 'relative',
    },
    icon: {
        position: "absolute",
        right: "10px",
        top: '20%',
        cursor: "pointer",
        color: "black",
        fontSize: "20px",
    },
    button: {
        backgroundColor: '#d57465',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#000',
    },
    loginOptions: {
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '14px',
    },
    link: {
        color: '#d57465',
        textDecoration: 'underline',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '10px',
    },
};

export default AdminLogin;
