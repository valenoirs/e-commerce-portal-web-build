"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingOrder = exports.updateOrderStatus = exports.userGetAllOrder = exports.createOrder = void 0;
const order_1 = require("../models/order");
const nanoid_1 = require("nanoid");
const admin_1 = require("../models/admin");
const createOrder = async (req, res) => {
    try {
        const { isCOD } = req.body;
        if (isCOD) {
            req.body.status = "Pesanan Diproses";
        }
        req.body.invoiceId = `#${(0, nanoid_1.nanoid)(10)}`;
        await new order_1.Order(req.body).save();
        return res.status(200).send({
            success: true,
            status: 200,
            message: "Pesanan berhasil dibuat.",
        });
    }
    catch (error) {
        console.error("[ERROR]: User sign up failed\n", error);
        return res.status(503).send({
            error: true,
            status: 503,
            type: "ServerError",
            message: "Terjadi kesalahan pada server, mohon coba lagi.",
        });
    }
};
exports.createOrder = createOrder;
const userGetAllOrder = async (req, res) => {
    try {
        const { userId } = req.query;
        const order = await order_1.Order.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            status: 200,
            data: {
                order,
            },
        });
    }
    catch (error) {
        console.error("[ERROR]: Get user order error.\n", error);
        return res.status(500).send({
            error: true,
            status: 503,
            type: "ServerError",
            message: "Terjadi kesalahan pada server, mohon coba lagi.",
        });
    }
};
exports.userGetAllOrder = userGetAllOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const { productId } = req.query;
        if (productId) {
            await order_1.Order.findByIdAndUpdate(productId, { $set: { status } });
            console.log(productId, status);
            console.log("Order status updated");
            req.flash("product", `Status pesanan berhasil diperbarui ke <i>${status}</i>`);
            return res.redirect("/");
        }
        await order_1.Order.findByIdAndUpdate(id, { $set: { status } });
        console.log("Order status updated");
        return res.status(200).send({
            success: true,
            status: 200,
        });
    }
    catch (error) {
        console.error("[ERROR]: Update Order status error.\n", error);
        return res.status(500).send({
            error: true,
            status: 503,
            type: "ServerError",
            message: "Terjadi kesalahan pada server, mohon coba lagi.",
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const ratingOrder = async (req, res) => {
    console.log(req.body);
    try {
        const { orderId, adminId, rating } = req.body;
        const admin = await admin_1.Admin.findById(adminId);
        console.log(admin);
        if (admin) {
            admin.rating.push(rating);
            const totalRating = admin.rating.reduce((a, b) => a + b);
            const rated = totalRating / admin.rating.length;
            admin.rated = rated.toString().slice(0, 3);
            console.log(admin.rated);
            await admin.save();
        }
        await order_1.Order.findByIdAndUpdate(orderId, {
            $set: { isRated: true, rated: rating },
        });
        console.log("[SERVER]: Rating updated");
        return res.status(200).send({
            success: true,
            status: 200,
            message: "Penilaian disimpan, terima kasih.",
        });
    }
    catch (error) {
        console.error("[ERROR]: Update Order rating error.\n", error);
        return res.status(500).send({
            error: true,
            status: 503,
            type: "ServerError",
            message: "Terjadi kesalahan pada server, mohon coba lagi.",
        });
    }
};
exports.ratingOrder = ratingOrder;
