"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_1 = require("../models/admin");
const product_1 = require("../models/product");
const order_1 = require("../models/order");
exports.router = (0, express_1.Router)();
exports.router.get("/", async (req, res) => {
    if (!req.session.admin)
        return res.redirect("/signin");
    const { id } = req.session.admin;
    const admin = await admin_1.Admin.findById(id);
    const product = await product_1.Product.find({ adminId: id });
    const order = await order_1.Order.find({ adminId: id });
    const lastOrder = await order_1.Order.find({ adminId: id }).limit(3);
    return res.render("home", {
        layout: "layout",
        error: req.flash("error"),
        productNotification: req.flash("product"),
        adminNotification: req.flash("admin"),
        admin,
        order,
        lastOrder,
        product,
    });
});
exports.router.get("/download", (req, res) => {
    if (req.session.admin)
        return res.redirect("/");
    return res.render("download", {
        layout: "layout",
        error: req.flash("error"),
    });
});
exports.router.get("/order", async (req, res) => {
    if (!req.session.admin)
        return res.redirect("/signin");
    return res.render("order", { layout: "layout", error: req.flash("error") });
});
exports.router.get("/signin", async (req, res) => {
    if (req.session.admin)
        return res.redirect("/");
    return res.render("signin", { layout: "layout", error: req.flash("error") });
});
exports.router.get("/signup", async (req, res) => {
    if (req.session.admin)
        return res.redirect("/");
    return res.render("signup", { layout: "layout", error: req.flash("error") });
});
