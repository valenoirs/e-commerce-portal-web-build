"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const fs_1 = require("fs");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        let dir;
        if (req.session.admin) {
            dir = path_1.default.join(__dirname, "../public/upload/product");
        }
        else {
            dir = path_1.default.join(__dirname, "../public/upload/sertifikat");
        }
        try {
            (0, fs_1.mkdirSync)(dir);
        }
        catch (error) {
            console.log("[server] ERR! directory-already-existed");
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
