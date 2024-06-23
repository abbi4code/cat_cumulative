"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
const PORT = 3000;
const URI = process.env.DATABASE_URI ||
    "mongodb+srv://abhishek:abhishek@azucation-cat.7ji4yva.mongodb.net/";
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173/",
}));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(URI, {
            dbName: "cs-db"
        }).then(() => console.log("database connected"));
        console.log(`Backend rnnung on server http://localhost:${PORT}`);
    }
    catch (error) {
        console.log(error);
        console.log("error while connecting to db");
    }
}));
