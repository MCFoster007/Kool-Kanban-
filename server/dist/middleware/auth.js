import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
// export const authenticateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers["authorization"] as string | undefined;
//   // Check if the Authorization header exists and starts with "Bearer "
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ message: "Access token is missing or invalid" });
//   }
//   const token = authHeader.split(" ")[1];
//   // Validate the token
//   jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Token is not valid" });
//     }
//     req.user = decoded as { username: string }; // Attach payload to request
//     return next();
//   });
// };
export const authenticateToken = (req, res, next) => {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
    // Check if the authorization header is present
    if (authHeader) {
        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];
        // Get the secret key from the environment variables
        const secretKey = process.env.JWT_SECRET_KEY || '';
        // Verify the JWT token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Send forbidden status if the token is invalid
            }
            // Attach the user information to the request object
            req.user = user;
            return next(); // Call the next middleware function
        });
    }
    else {
        res.sendStatus(401); // Send unauthorized status if no authorization header is present
    }
};
