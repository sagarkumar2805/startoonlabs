import React, { useState } from 'react';
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState()
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const navigate = useNavigate();
    const onSubmit = async e => {
        e.preventDefault();
        try {
            let res = await axios.post(`${BASE_URL}/auth/login`, formData);
            setError('Login Successful')
            localStorage.setItem("id", res.data.user._id)
            if (res.data.user.isAdmin) {
                navigate("/adminDashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    return (
        <div className="auth-container">
            <div className='auth'>
                <div className='auth-left'>
                    <img src="./assets/logo pheezee 03@2x tr.png" alt="" />
                </div>
                <div className='auth-right'>
                    <h1>Sign In</h1>
                    <form onSubmit={onSubmit}>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            required
                            placeholder='Email'
                        />


                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            required
                            placeholder='Password'
                        />

                        <div className="buttons-section">
                            <button type="submit">Sign In</button>
                            <button>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>

            <span>
                {
                    error
                }
            </span>
        </div>
    );
};

export default Login;
