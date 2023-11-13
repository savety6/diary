import { Router } from 'express';
import User from '../Models/UserSchema';
import jwt from 'jsonwebtoken';

const router = Router();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401).send('Not authorized, no token');
    }
};
// GET all users
router.get('/', protect, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET user by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PUT update user by ID
router.put('/:id', protect, async (req, res) => {
    try {
        res.json({ message: 'PUT /User/:id' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// DELETE user by ID
router.delete('/:id', protect, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
