"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const mongoose_1 = require("mongoose");
const RootSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Root = (0, mongoose_1.model)("Root", RootSchema);
