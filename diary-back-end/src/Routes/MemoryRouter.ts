import { Router } from 'express';
import MemoryParser from '../Utility/SaxParser';
import jwt from 'jsonwebtoken';

import Memory from '../Models/MemorySchema';

import protect from '../Utility/protectMiddleware';

const router = Router();

// GET all memories
router.get('/', protect, async (req, res) => {
    try {
        const userToken = req.headers.authorization!.split(' ')[1];
        const userId = jwt.verify(userToken, process.env.JWT_SECRET!).id;
        
        const memories = await Memory.find({ ownerId: userId });
        res.status(200).json(memories);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET memory by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        res.status(200).json(memory);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// POST new memory
router.post('/', protect, async (req, res) => {
    try {
        const parser = new MemoryParser();
        const parsedMemory = parser.parseXML(req.body.content);
        console.log(parsedMemory);
        
        const userToken = req.headers.authorization!.split(' ')[1];
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET!);
        const userId = decoded.id;

        const memory = await Memory.create({
            title: parsedMemory.title,
            subtitle: parsedMemory.subtitle,
            content: req.body.content,
            tags: [],
            date: parsedMemory.date,
            ownerId: userId, 
        });
        await memory.save();
        res.status(201).json({ memory: "ok" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;

