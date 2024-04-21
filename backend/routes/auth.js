import express from 'express'
import { login, signup } from '../controllers/auth.mjs';
const router = express.Router();

// user registration
router.post("/signup",signup)
router.post("/login",login)

export default router