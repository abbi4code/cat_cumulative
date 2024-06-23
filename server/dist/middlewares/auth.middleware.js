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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authvalidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        if (!token) {
            res.status(404).json({ msg: "token not provided" });
        }
        const headertoken = token === null || token === void 0 ? void 0 : token.split(" ")[1];
        console.log(headertoken);
        //@ts-ignore
        const decoded = jsonwebtoken_1.default.verify(headertoken, process.env.JWT_SECRET);
        console.log(decoded);
        if (!decoded) {
            return res.json({ msg: "invalid token" });
        }
        //@ts-ignore
        req.admin = decoded.admin;
        next();
    }
    catch (error) {
        console.log(error);
        res.send("error while verifying tokens");
    }
});
exports.default = authvalidation;
