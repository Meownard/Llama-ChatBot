import { createLogger, format, transports } from "winston";
const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combined.log" }),
        new transports.File({ filename: "logs/ai.log" }), // AI-specific log file
    ],
});
export default logger;
//# sourceMappingURL=logger.js.map