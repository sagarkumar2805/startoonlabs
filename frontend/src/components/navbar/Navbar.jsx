import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../config';
import axios from 'axios';

const Navbar = () => {
    const [user, setUser] = useState()

    const navigte = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/user/${localStorage.getItem('id')}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);
    const handleLogOut = () => {
        localStorage.clear()
        navigte("/login", { replace: true })
    }
    return (
        <div className="navbar-container">
            <div className='navbar'>
                <div>
                    <Link to="/">
                        <button id='home'>Home</button>
                    </Link>
                    {user?.isAdmin ? (<Link to="/graph">
                        <button id='graph'>Graph</button>
                    </Link>) : (<div onClick={() => { alert("You Need Admin Privilage") }}>
                        <button id='graph'>Graph</button>
                    </div>)}
                </div>
                <div>
                    <input type="text" />
                    <Link to="">
                        <button id='search'>Search</button>
                    </Link>

                    <button onClick={handleLogOut}>Logout</button>

                </div>
            </div>
        </div>
    )
}

export default Navbar