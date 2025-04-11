"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationAI = ConfigurationAI;
const openai_1 = __importDefault(require("openai"));
function ConfigurationAI() {
    const config = new openai_1.default({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
    return config;
}
;
//# sourceMappingURL=openai-config.js.map