"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uservalidation = void 0;
const zod_1 = __importDefault(require("zod"));
const uservalidation = zod_1.default.object({
    email: zod_1.default.string().email({ message: "invalid email address" }),
    password: zod_1.default.string().min(8, { message: "Must be 8 or more characters long" }),
    name: zod_1.default.string().optional()
});
exports.uservalidation = uservalidation;
