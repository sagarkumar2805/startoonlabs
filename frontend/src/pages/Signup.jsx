import React, { useState } from 'react';
import './Auth.css'
import useFetch from '../hooks/UseFetch';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: ''
    });

    const onChange = (e) => {
        console.log(formData)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const navigate = useNavigate();
    const onSubmit = async e => {
        e.preventDefault();
        try {
            let res = await axios.post(`${BASE_URL}/auth/signup`, formData);

            navigate("/login", { replace: true });

        } catch (error) {
            console.log(error);
        }
        // Add your signup logic here (e.g., send POST request to backend)
    };

    return (

        <div className="auth-container">
            <div className='auth'>
                <div className='auth-left'>
                    <img src="./assets/logo pheezee 03@2x tr.png" alt="" />
                </div>
                <div className='auth-right'>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                            placeholder='Name'
                        />
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
                        <div className='gender'>
                            <label>Gender</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={onChange}
                                        required
                                    /> Male
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={onChange}
                                        required
                                    /> Female
                                </label>
                            </div>
                        </div>
                        <div className="buttons-section">
                            <button type="submit">Sign Up</button>
                            <button>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Signup;
