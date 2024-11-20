import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';
        jwt.verify(token, secretKey, (err, user) => {
            console.log('verifing token');
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            console.log('pass if');
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
