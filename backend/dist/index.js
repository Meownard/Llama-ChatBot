"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const connectdb_js_1 = require("./db/connectdb.js");
//conection and listeners
const PORT = process.env.PORT || 3000;
(0, connectdb_js_1.connectToDatabase)()
    .then(() => {
    app_js_1.default.listen(PORT, () => console.log('Server is running & Database is connected'));
})
    .catch((error) => { console.log(error); });
//# sourceMappingURL=index.js.map