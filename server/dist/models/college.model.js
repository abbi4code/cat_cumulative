"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CollegeSchema = new mongoose_1.Schema({
    clgname: {
        type: String,
        required: true,
        unique: true,
    },
    Category: {
        type: String,
        default: "GEN",
    },
    compositescore: {
        type: Number,
        max: [100, "Invalid input"],
    },
    VARC_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString("0"),
        validate: {
            validator: (value) => parseFloat(value.toString()) <= 100,
            message: "Invalid input",
        },
    },
    QA_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString("0"),
        validate: {
            validator: (value) => parseFloat(value.toString()) <= 100,
            message: "Invalid input",
        },
    },
    DILR_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString("0"),
        validate: {
            validator: (value) => parseFloat(value.toString()) <= 100,
            message: "Invalid input",
        },
    },
    overall_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString("0"),
        validate: {
            validator: (value) => parseFloat(value.toString()) <= 100,
            message: "Invalid input",
        },
    },
    admin: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
    },
});
const Clgscore = mongoose_1.default.model("Clgscore", CollegeSchema);
exports.default = Clgscore;
