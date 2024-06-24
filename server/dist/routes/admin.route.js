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
const admin_model_1 = __importDefault(require("../models/admin.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const college_model_1 = __importDefault(require("../models/college.model"));
const router = express_1.default.Router();
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existuser = yield admin_model_1.default.findOne({ username, password });
        if (!existuser) {
            return res.json({ msg: "admin account not exist with the input provided" });
        }
        const options = {
            httponly: true,
            secure: true
        };
        const admin = existuser._id;
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ admin }, process.env.JWT_SECRET);
        res.cookie("accesstoken", token, options);
        res.status(200).json({ msg: "admin logged-in successfully", token });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "error while admin signin" });
    }
}));
router.post('/create', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.body;
    try {
        const clgexist = yield college_model_1.default.findOne({ clgname: details.clgname });
        if (clgexist) {
            return res.json({ msg: "clg already in the db" });
        }
        //@ts-ignore
        const info = req.admin;
        console.log(info);
        const admin = yield admin_model_1.default.findOne({ _id: info });
        console.log(admin);
        const newclg = new college_model_1.default({ clgname: details.clgname, compositescore: details.compositescore, DILR_percentile: details.DILR_percentile, QA_percentile: details.QA_percentile, overall_percentile: details.overall_percentile, VARC_percentile: details.VARC_percentile });
        yield newclg.save();
        res.status(200).json({ msg: "clg successfully saved in db" });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ msg: "error while creating clg db" });
    }
}));
exports.default = router;
