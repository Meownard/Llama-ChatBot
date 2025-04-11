"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_manager_1 = require("../utils/token-manager");
const validators_1 = require("../utils/validators");
const chat_controller_1 = require("../controllers/chat-controller");
const chatRoutes = (0, express_1.Router)();
chatRoutes.post("/new", (0, validators_1.validate)(validators_1.chatCompletionValidator), token_manager_1.verifyToken, async (req, res, next) => {
    try {
        await (0, chat_controller_1.generateChatCompletion)(req, res);
    }
    catch (error) {
        next(error);
    }
});
chatRoutes.get("/all-chats", token_manager_1.verifyToken, async (req, res, next) => {
    try {
        await (0, chat_controller_1.sendChatsToUser)(req, res);
    }
    catch (error) {
        next(error);
    }
});
chatRoutes.delete("/delete", token_manager_1.verifyToken, async (req, res, next) => {
    try {
        await (0, chat_controller_1.deleteChats)(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = chatRoutes;
//# sourceMappingURL=chat-routes.js.map