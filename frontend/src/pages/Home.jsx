import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import axios from 'axios'
import { BASE_URL } from '../config'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('id')
  const navigte = useNavigate()
  useEffect(() => {
    if (!userId) {
      navigte('/login', { replace: true })
    }
  }, [])
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

  return (
    <div className="home-container">
      <Navbar />
      <div className="user-details">
        {user && (
          <div>
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Count: {user.count}</p>
            <p>Gender: {user.gender}</p>
            <p>Last Login Date: {new Date(user.updatedAt).toLocaleString('in')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
