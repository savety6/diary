import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User";
import {MongoError} from "mongodb";

const router = Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h', // Token expiration time
    });
};

router.post("/login", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user;

        if (name) {
            user = await User.findOne({ name, password });
        } else if (email) {
            user = await User.findOne({ email, password });
        } else {
            res.status(400).json({ error: "Please provide either name or email" });
            return;
        }

        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        const token = generateToken(user);
        res.send(token);
    } catch (error) {
        if (error instanceof MongoError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});



router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({
            name,
            email,
            password
        });
        await user.save();
        const token = generateToken(user);
        res.send(token);
    }
        catch (error) {
            if(error instanceof MongoError){
                if (error.code === 11000) { //TODO: check for other known errors
                    res.status(400).json({ error: "User already exists" });
                } else {
                    res.status(400).json({ error: error.message });
                }
            }
            else{
                res.status(400).json({ error: error });
            }
        }
});

export default router;