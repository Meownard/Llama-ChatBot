import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// Fix for ES Modules: Getting the current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from "./utils/logger.js";
// Load environment variables
config();
const app = express();
// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// Example usage
logger.info("Server started successfully");
logger.error("An error occurred");
logger.log("info", "Some custom log message");
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (_req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
// Remove it in production
app.use(morgan('dev'));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map