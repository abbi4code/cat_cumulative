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
const types_1 = require("../types");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const validuser = types_1.uservalidation.safeParse({ email, password, name });
        if (!validuser.success) {
            return res.send(validuser.error.errors.map(error => error.message));
        }
        const existuser = yield user_model_1.default.findOne({ email });
        if (existuser) {
            return res.json({ msg: "user already exists" });
        }
        const newuser = new user_model_1.default({ email, password, name });
        yield newuser.save();
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({ msg: "user signup successfully", token });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ msg: "error while signup" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validuser = types_1.uservalidation.safeParse({ email, password });
        if (!validuser.success) {
            return res.send(validuser.error.errors.map(error => error.message));
        }
        const existuser = yield user_model_1.default.findOne({ email });
        if (!existuser) {
            return res.json({ msg: "user not exist" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({ msg: "user signin successfully", token });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ msg: "error while signin" });
    }
}));
exports.default = router;
