"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CollegeSchema = new mongoose_1.default.Schema({
    clgname: {
        type: String,
        required: true,
        unique: true
    },
    matriculation: {
        type: Number,
        required: true,
        integer: true,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
        default: 0,
        max: [100, "Invalid Input"]
    },
    plustwo: {
        type: Number,
        required: true,
        integer: true,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
        default: 0,
        max: [100, "Invalid Input"]
    },
    graduation: {
        type: Number,
        required: true,
        integer: true,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
        default: 0,
        max: [100, "Invalid Input"]
    },
    VARC: {
        type: Number,
        required: true,
        integer: true,
        default: 0,
        max: [72, "Invalid Input"]
    },
    QA: {
        type: Number,
        required: true,
        integer: true,
        default: 0,
        max: [66, "Invalid Input"]
    },
    DILR: {
        type: Number,
        required: true,
        integer: true,
        default: 0,
        max: [60, "Invalid Input"]
    },
    VARC_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    QA_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    DILR_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    overall_percentile: {
        type: mongoose_1.default.Schema.Types.Decimal128,
        default: mongoose_1.default.Types.Decimal128.fromString('0'),
        validate: {
            validator: (value) => value.toString() <= '100',
            message: 'Invalid input'
        }
    },
    overall: {
        type: Number,
        default: 0,
        max: [198, "Invalid input"]
    },
    compositescore: {
        type: Number,
        max: [100, "Invalid input"]
    }
});
const Clgscore = mongoose_1.default.model("Clgscore", CollegeSchema);
exports.default = Clgscore;
