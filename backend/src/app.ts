import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import { cookie } from 'express-validator';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from "./utils/logger.js";
import path from 'path';

config();
const app = express();

//middlewares
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


// Example usage
logger.info("Server started successfully");
logger.error("An error occurred");
logger.log("info", "Some custom log message");

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

//rempve it in  production
app.use(morgan('dev'));

app.use("/api/v1", appRouter)

export default app;