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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product = __importStar(require("../controllers/product"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const multer_2 = require("../middleware/multer");
const multerOption = {
    fileFilter: function (req, file, callback) {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== ".png") {
            return callback(null, false);
        }
        callback(null, true);
    },
    storage: multer_2.storage,
};
const upload = (0, multer_1.default)(multerOption);
exports.router = (0, express_1.Router)();
exports.router.post("/", upload.single("file"), product.createProduct);
exports.router.put("/", upload.single("file"), product.updateProduct);
exports.router.delete("/", product.deleteProduct);
exports.router.get("/", product.readProduct);
