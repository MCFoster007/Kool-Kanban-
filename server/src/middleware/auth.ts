import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
interface JwtPayload {
  username: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;
console.log(authHeader);

  if (authHeader) {
 
    const token = authHeader.split(' ')[1];


    const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';
//because i did an or then i need tjo identify it.  in auth routes 
    
    jwt.verify(token, secretKey, (err, user) => {
      console.log('verifing token');
      if (err) {
        console.log(err);
        return res.sendStatus(403); 
      }
console.log('pass if');
 
      req.user = user as JwtPayload;
      return next(); 
    });
  } else {
    res.sendStatus(401); 
  }
};









