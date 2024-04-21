import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Chart from 'chart.js/auto'; // Import Chart.js
import axios from 'axios';
import { BASE_URL } from '../../config';

const Graph = () => {


  const [userData, setUserData] = useState([]);
  const [totalClicked, setTotalClicked] = useState(0)
  useEffect(() => {
    const allUsers = async () => {
      const users = await axios.get(`${BASE_URL}/users/usersdetails`)
      console.log(users)
      setUserData(users.data)
    }
    allUsers()
  }, [])




  useEffect(() => {
    let total = 0;
    userData.forEach(user => {
      total += user.averageCount;
    });
    setTotalClicked(total);
  }, [userData]);

  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'User Count',
        data: [12, 19, 3, 5, 2, 3, 7, 8, 10, 15, 20, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    if (userData) {
      data.labels = userData.map(data => data.month)
      data.datasets[0].data = userData.map(data => data.averageCount)
      console.log(data)
    }
    if (chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [userData]);

  return (
    <div>
      <Navbar /><br />
      <div>
        <div className='totalUserCount'>
          {userData.length}
        </div>
        <div className='totalClickCount'>
          {totalClicked}
        </div>
      </div>
      <div style={{ width: "70%", margin: "auto", height: "80%" }}>
        <h2>Bar Graph</h2>
        <canvas ref={chartRef} id="myChart" width="300" height="200"></canvas>
      </div>
    </div>
  );
};

export default Graph;
