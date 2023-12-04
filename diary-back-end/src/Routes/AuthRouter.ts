import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/UserSchema";
import { MongoError } from "mongodb";

const router = Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1w', // Token expiration time
    });
};

router.post("/login", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user;

        if (name) {
            user = await User.findOne({ name });
        } else if (email) {
            user = await User.findOne({ email });
        } else {
            return res.status(400).json({ error: "Please provide either name or email" });
        }
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ token: token });
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
        res.status(200).json({ token: token });
    }
    catch (error) {
        console.log(error);
        
        if (error instanceof MongoError) {
            if (error.code === 11000) { //TODO: check for other known errors
                res.status(400).json({ error: "User already exists" });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
        else {
            res.status(400).json({ error: error });
        }
    }
});

router.get("/verify", async (req, res) => {
    const BearerToken:string | undefined = req.headers.authorization;
    const token:string | undefined = BearerToken?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ error: "Access denied" });
        }
        const newToken = generateToken(user);
        res.status(200).json({ token: newToken });
        
    } catch (error) {

        if (error instanceof jwt.TokenExpiredError) {
            return res.json({ error: "Token Expired" });
        }
        res.status(400).json({ error: "Access denied" });
        console.log(error);
        
    }
});

export default router;