"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.verifyUser = exports.userLogin = exports.userSignUp = exports.getAllUsers = void 0;
const bcrypt_1 = require("bcrypt");
const users_js_1 = __importDefault(require("../models/users.js"));
const token_manager_js_1 = require("../utils/token-manager.js");
const constants_js_1 = require("../utils/constants.js");
const getAllUsers = async (_, res) => {
    try {
        const users = await users_js_1.default.find();
        res.status(200).json({ message: "All users", users });
        return; // Explicit return, but not required
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", cause: error.message });
        return;
    }
};
exports.getAllUsers = getAllUsers;
const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await users_js_1.default.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new users_js_1.default({ name, email, password: hashedPassword });
        await user.save();
        //create token and store cookie
        res.clearCookie(constants_js_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_js_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        res.status(200).json({ message: "Okay", name: user.name, email: user.email });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", cause: error.message });
        return;
    }
};
exports.userSignUp = userSignUp;
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users_js_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isCorrectPassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!isCorrectPassword) {
            res.status(403).json({ message: "Invalid Password" });
            return;
        }
        res.clearCookie(constants_js_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_js_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        res.status(200).json({ message: "Okay", name: user.name, email: user.email });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", cause: error.message });
        return;
    }
};
exports.userLogin = userLogin;
const verifyUser = async (_, res) => {
    try {
        if (!res.locals.jwtData || !res.locals.jwtData.id) {
            res.status(401).json({ message: "Token is missing or invalid" });
            return;
        }
        const user = await users_js_1.default.findById(res.locals.jwtData.id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR", cause: error.message });
        return;
    }
};
exports.verifyUser = verifyUser;
const userLogout = async (req, res) => {
    try {
        //user token check
        const user = await users_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User not registered OR Token malfunctioned" });
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).json({ message: "Permissions didn't match" });
            return;
        }
        res.clearCookie(constants_js_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        res.status(200).json({ message: "OK", name: user.name, email: user.email });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "ERROR", cause: error.message });
        return;
    }
};
exports.userLogout = userLogout;
//# sourceMappingURL=user-controller.js.map