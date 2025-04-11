import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator, validate } from "../utils/validators";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controller";

const chatRoutes = Router();
chatRoutes.post(
    "/new",
    validate(chatCompletionValidator),
    verifyToken,
    async (req, res, next) => {
        try {
            await generateChatCompletion(req, res);
        } catch (error) {
            next(error);
        }
    }
);

chatRoutes.get("/all-chats", verifyToken, async (req, res, next) => {
    try {
        await sendChatsToUser(req, res);
    } catch (error) {
        next(error);
    }
});

chatRoutes.delete("/delete", verifyToken, async (req, res, next) => {
    try {
        await deleteChats(req, res);
    } catch (error) {
        next(error);
    }
});

export default chatRoutes;