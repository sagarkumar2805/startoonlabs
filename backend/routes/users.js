import express from 'express'
import { getAllUsers, getAverageUserCountByMonth, getUserById } from '../controllers/users.js';


const   router = express.Router();

// user registration
router.get("/allUsers", getAllUsers);
router.get("/usersdetails", getAverageUserCountByMonth);
router.get("/user/:id", getUserById);


export default router