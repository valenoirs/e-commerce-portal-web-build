"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    adminId: { type: String, required: true },
    admin: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    picture: { type: String, required: true },
    available: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
