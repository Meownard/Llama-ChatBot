"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompletionValidator = exports.signupValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return; // Ensure function exits after sending response
        }
        next(); // Explicitly return next() to match void | Promise<void>
    };
};
exports.validate = validate;
exports.loginValidator = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isString().withMessage("Password must be a string")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
exports.signupValidator = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),
    ...exports.loginValidator,
];
exports.chatCompletionValidator = [
    (0, express_validator_1.body)("message").notEmpty().withMessage("Message is required")
];
//# sourceMappingURL=validators.js.map