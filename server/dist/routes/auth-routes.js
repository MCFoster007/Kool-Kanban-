import { Router } from 'express';
import { User } from '../models/user.js'; // Replace with your actual User model import
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use an environment variable for security
const JWT_EXPIRATION = '1h'; // Token validity duration
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } }); // Adjust query for your ORM (e.g., Sequelize, Mongoose, etc.)
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, {
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
// POST /login - Login a user
router.post('/login', login);
export default router;
