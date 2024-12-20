import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';
//need tjo put in server auth.ts cuz i have an OR statement
const JWT_EXPIRATION = '1h'; // Token time
export const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log("log in");
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRATION,
        });
        // Return the token to the client
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const router = Router();
router.post('/login', login);
// POST /login - Login a user
// fetch('/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
// })
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return res.json();
//   })
//   .then((data) => {
//     localStorage.setItem('token', data.token);
//   })
//   .catch((error) => {
//     console.error('Fetch error:', error);
//   });
export default router;
