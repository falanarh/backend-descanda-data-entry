import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

// Define interface for decoded token payload
interface TokenPayload {
  id: string;
  email: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    // Attach decoded information to request
    (req as any).user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: 'Invalid token.',
    });
  }
};

export default authMiddleware;
