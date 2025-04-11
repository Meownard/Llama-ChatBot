"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
const users_1 = __importDefault(require("../models/users"));
const ollama_config_1 = __importDefault(require("../config/ollama-config")); // Import the Ollama host
const axios_1 = __importDefault(require("axios")); // Import axios
// Generate chat completion using Ollama API
const generateChatCompletion = async (req, res) => {
    try {
        const { message } = req.body;
        const user = await users_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not registered OR Token invalid" });
        // Ensure correct type for chats array
        const chats = user.chats.map(chat => ({
            role: chat.role,
            content: chat.content
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // Send request to Ollama API (Llama3.2)
        const response = await axios_1.default.post(`${ollama_config_1.default}/v1/chat/completions`, {
            model: "llama3.2", // Assuming Llama3.2 is used with Ollama
            messages: chats
        });
        const botMessage = response.data.choices[0].message;
        user.chats.push(botMessage);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
exports.generateChatCompletion = generateChatCompletion;
// Send chats to the user
const sendChatsToUser = async (req, res) => {
    try {
        const user = await users_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.sendChatsToUser = sendChatsToUser;
// Delete chats
const deleteChats = async (req, res) => {
    try {
        const user = await users_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        user.chats = []; // Clear chats with correct type
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.deleteChats = deleteChats;
//# sourceMappingURL=chat-controller.js.map