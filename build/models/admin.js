"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: {
        type: String,
        required: true,
        default: "Deskripsi singkat toko.",
    },
    certificatePIRT: { type: String, required: true },
    certificateHalal: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isOpen: { type: Boolean, required: true, default: false },
    address: { type: String, default: " ", required: true },
    rated: { type: String, required: true, default: "3" },
    rating: { type: [Number], required: true, default: [3] },
}, {
    timestamps: true,
});
exports.Admin = (0, mongoose_1.model)("Admin", AdminSchema);
