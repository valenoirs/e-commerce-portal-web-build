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
exports.router = void 0;
const express_1 = require("express");
const root = __importStar(require("../controllers/root"));
const admin_1 = require("../models/admin");
const user_1 = require("../models/user");
exports.router = (0, express_1.Router)();
exports.router.post("/", root.signIn);
exports.router.get("/signout", root.signOut);
exports.router.delete("/admin", root.deleteAdmin);
exports.router.patch("/user", root.updateUser);
exports.router.delete("/user", root.deleteUser);
exports.router.get("/", async (req, res) => {
    if (!req.session.root)
        return res.redirect("/root/signin");
});
exports.router.get("/admin", async (req, res) => {
    if (!req.session.root)
        return res.redirect("/root/signin");
    const admins = await admin_1.Admin.find();
    return res.render("root/admin", {
        layout: "layout",
        error: req.flash("error"),
        rootNotification: req.flash("root"),
        admins,
    });
});
exports.router.get("/user", async (req, res) => {
    if (!req.session.root)
        return res.redirect("/root/signin");
    const users = await user_1.User.find();
    return res.render("root/user", {
        layout: "layout",
        error: req.flash("error"),
        rootNotification: req.flash("root"),
        users,
    });
});
exports.router.get("/signin", async (req, res) => {
    if (req.session.root)
        return res.redirect("/root");
    return res.render("root/signin", {
        layout: "layout",
        error: req.flash("error"),
        rootNotification: req.flash("root"),
    });
});
