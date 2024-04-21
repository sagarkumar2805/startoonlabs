import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config'

const AdminDashboard = () => {


  const [userData, setUserData] = useState([])
  const [user, setUser] = useState([])
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
        if (!response.data.isAdmin) {
          navigte("/", { replace: true })
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const allUsers = async () => {
      const users = await axios.get(`${BASE_URL}/users/allUsers`)
      console.log(users.data.name)
      setUserData(users.data)

    }
    allUsers()
  }, [])



  let count = 1;

  return (
    <>
      <Navbar />
      <div className='table-container'>
        <table border={1}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Count</th>
              <th>Last Login Date</th>
            </tr>
          </thead>
          <tbody>
            {
              userData.map((e) => {
                // console.log(e)
                return (
                  <tr>
                    <td>{count++}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.count}</td>
                    <td>{new Date(e.updatedAt).toLocaleString('in')}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>

  )
}

export default AdminDashboard