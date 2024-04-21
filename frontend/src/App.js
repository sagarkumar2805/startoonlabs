import { useEffect } from 'react';
import './App.css';
import AdminDashboard from './components/admin/AdminDashboard';
import Graph from './components/graph/Graph';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from './context';


function App() {
  const userId = localStorage.getItem('id')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/adminDashboard' element={<AdminDashboard/>} />
          <Route path='graph' element={<Graph/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
