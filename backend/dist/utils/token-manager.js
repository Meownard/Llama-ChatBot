"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_js_1 = require("./constants.js");
const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    const token = req.signedCookies[constants_js_1.COOKIE_NAME];
    if (!token || token.trim() === "") {
        res.status(401).json({ message: "Token Not Received" });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
            res.status(401).json({ message: "Token Expired" });
            return;
        }
        res.locals.jwtData = success; // Store decoded JWT data
        next(); // Call next middleware
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token-manager.js.map