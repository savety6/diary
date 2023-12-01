import { Router } from 'express';
import MemoryParser from '../Utility/SaxParser';

import Memory from '../Models/MemorySchema';

import protect from '../Utility/protectMiddleware';

const router = Router();

// GET all memories
router.get('/', protect, async (req, res) => {
    try {
        const memories = await Memory.find();
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
        const memory = await Memory.create({
            title: parsedMemory.title,
            subtitle: parsedMemory.subtitle,
            content: req.body.content,
            tags: [],
            date: parsedMemory.date,
        });
        await memory.save();
        res.status(201).json({ memory: "ok" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



export default router;

