"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
const logger_js_1 = __importDefault(require("./utils/logger.js"));
// Example usage
logger_js_1.default.info("Server started successfully");
logger_js_1.default.error("An error occurred");
logger_js_1.default.log("info", "Some custom log message");
//rempve it in  production
app.use((0, morgan_1.default)('dev'));
app.use("/api/v1", index_js_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map