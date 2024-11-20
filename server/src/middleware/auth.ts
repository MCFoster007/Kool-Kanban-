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


  if (authHeader) {
 
    const token = authHeader.split(' ')[1];


    const secretKey = process.env.JWT_SECRET_KEY || '';

    
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); 
      }

 
      req.user = user as JwtPayload;
      return next(); 
    });
  } else {
    res.sendStatus(401); 
  }
};









