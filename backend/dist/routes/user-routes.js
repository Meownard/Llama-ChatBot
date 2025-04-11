"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user-controller.js");
const validators_js_1 = require("../utils/validators.js");
const token_manager_js_1 = require("../utils/token-manager.js");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controller_js_1.getAllUsers);
userRouter.post("/signup", (0, validators_js_1.validate)(validators_js_1.signupValidator), user_controller_js_1.userSignUp);
userRouter.post("/login", (0, validators_js_1.validate)(validators_js_1.loginValidator), user_controller_js_1.userLogin);
userRouter.get("/auth-status", token_manager_js_1.verifyToken, user_controller_js_1.verifyUser);
userRouter.get("/logout", token_manager_js_1.verifyToken, user_controller_js_1.userLogout);
exports.default = userRouter;
//# sourceMappingURL=user-routes.js.map