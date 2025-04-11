import { Request, Response, RequestHandler } from "express";
import { hash, compare } from "bcrypt";
import User from "../models/users.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "All users", users });
        return; // Explicit return, but not required
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", cause: error.message });
        return;
    }
};


export const userSignUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        //create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        res.status(200).json({ message: "Okay", name: user.name, email: user.email });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", cause: error.message });
        return;
    }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isCorrectPassword = await compare(password, user.password);
        if (!isCorrectPassword) {
            res.status(403).json({ message: "Invalid Password" });
            return;
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        res.status(200).json({ message: "Okay", name: user.name, email: user.email });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", cause: error.message });
        return;
    }
};

export const verifyUser: RequestHandler = async (_, res) => {
    try {
        if (!res.locals.jwtData || !res.locals.jwtData.id) {
            res.status(401).json({ message: "Token is missing or invalid" });
            return;
        }
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User not registered OR Token invalid" });
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(403).json({ message: "Permission denied" });
            return;
        }
        res.status(200).json({ message: "OK", name: user.name, email: user.email });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR", cause: error.message });
        return; 
    }
};


export const userLogout = async (req: Request, res: Response): Promise<void> => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        return;
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        res.status(401).json({ message: "Permissions didn't match" });
        return;
      }
  
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
  
      res.status(200).json({ message: "OK", name: user.name, email: user.email });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "ERROR", cause: error.message });
      return;
    }
  };