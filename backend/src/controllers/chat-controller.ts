import { Request, Response, NextFunction } from "express";
import User from "../models/users.js";
import OLLAMA_HOST from "../config/ollama-config.js"; // Import the Ollama host

import axios from "axios"; // Import axios

type ChatCompletionRequestMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Generate chat completion using Ollama API
export const generateChatCompletion = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User not registered OR Token invalid" });

    // Ensure correct type for chats array
    const chats: ChatCompletionRequestMessage[] = user.chats.map(chat => ({
      role: chat.role as "user" | "assistant" | "system",
      content: chat.content
    }));

    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Send request to Ollama API (Llama3.2)
    const response = await axios.post(`${OLLAMA_HOST}/v1/chat/completions`, {
      model: "llama3.2",  // Assuming Llama3.2 is used with Ollama
      messages: chats
    });

    const botMessage = (response.data as { choices: { message: ChatCompletionRequestMessage }[] }).choices[0].message;
    user.chats.push(botMessage);
    await user.save();
    
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Send chats to the user
export const sendChatsToUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// Delete chats
export const deleteChats = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    user.chats = [] as unknown as typeof user.chats; // Clear chats with correct type
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
