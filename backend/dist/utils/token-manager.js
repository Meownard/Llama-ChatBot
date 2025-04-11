import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME];
    if (!token || token.trim() === "") {
        res.status(401).json({ message: "Token Not Received" });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
            res.status(401).json({ message: "Token Expired" });
            return;
        }
        res.locals.jwtData = success; // Store decoded JWT data
        next(); // Call next middleware
    });
};
//# sourceMappingURL=token-manager.js.map