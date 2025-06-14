import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized, token missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized, user not found' });
        }

        req.user = user;
        next(); // ✅ correct here

    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ success: false, message: 'Token invalid or expired' });
    }
}
