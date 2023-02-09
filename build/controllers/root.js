"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.deleteAdmin = exports.signOut = exports.signIn = void 0;
const root_1 = require("../models/root");
const config_1 = __importDefault(require("../config/config"));
const admin_1 = require("../models/admin");
const user_1 = require("../models/user");
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const root = await root_1.Root.findOne({ email });
        if (!root) {
            req.flash("root", "Email belum terdaftar.");
            console.log("[SERVER]: Email not registered");
            return res.redirect("/root/signin");
        }
        if (password !== root.password) {
            req.flash("root", "Password salah.");
            console.log("[SERVER]: Incorrect password");
            return res.redirect("/root/signin");
        }
        const { id, name } = root;
        const rootSession = {
            id,
            name,
            email,
        };
        req.session.root = rootSession;
        req.flash("root", "Anda berhasil login sebagai Root.");
        console.log("[SERVER]: Root logged in.");
        return res.redirect("/root/admin");
    }
    catch (error) {
        req.flash("root", "Terjadi kesalahan saat mencoba masuk, coba lagi.");
        console.error("[SERVER]: Sign in error.", error);
        return res.redirect("/root/signin");
    }
};
exports.signIn = signIn;
const signOut = async (req, res) => {
    try {
        if (!req.session.root) {
            req.flash("root", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
            console.log("[SERVER]: No session id provided.");
            return res.redirect("/root/signin");
        }
        const { email } = req.session.root;
        req.session.destroy((error) => {
            if (error)
                throw error;
            res.clearCookie(config_1.default.SESSION_COLLECTION_NAME);
            console.log(`[SERVER]: ${email} signed out.`);
            return res.redirect("/root/signin");
        });
    }
    catch (error) {
        req.flash("root", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
        console.error("[SERVER]: Sign out error.", error);
        return res.redirect("/root");
    }
};
exports.signOut = signOut;
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.body;
        const admin = await admin_1.Admin.findById(id);
        if (!admin) {
            req.flash("root", "Toko tidak ditemukan.");
            console.error("[SERVER]: Admin not found.");
            return res.redirect("back");
        }
        await admin_1.Admin.findByIdAndDelete(id);
        req.flash("root", "Toko berhasil dihapus.");
        console.error("[SERVER]: Admin deleted.");
        return res.redirect("back");
    }
    catch (error) {
        req.flash("root", "Terjadi kesalahan saat mencoba menghapus toko, coba lagi.");
        console.error("[SERVER]: Delete admin error.", error);
        return res.redirect("back");
    }
};
exports.deleteAdmin = deleteAdmin;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await user_1.User.findById(id);
        if (!user) {
            req.flash("root", "Pengguna tidak ditemukan.");
            console.error("[SERVER]: User not found.");
            return res.redirect("back");
        }
        await user_1.User.findByIdAndDelete(id);
        req.flash("root", "Pengguna berhasil dihapus.");
        console.error("[SERVER]: User deleted.");
        return res.redirect("back");
    }
    catch (error) {
        req.flash("root", "Terjadi kesalahan saat mencoba menghapus pengguna, coba lagi.");
        console.error("[SERVER]: Delete user error.", error);
        return res.redirect("back");
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await user_1.User.findById(id);
        if (!user) {
            req.flash("root", "Pengguna tidak ditemukan.");
            console.error("[SERVER]: User not found.");
            return res.redirect("back");
        }
        await user_1.User.findByIdAndUpdate(id, { $set: req.body });
        req.flash("root", "Pengguna berhasil diperbarui.");
        console.error("[SERVER]: User updated.");
        return res.redirect("back");
    }
    catch (error) {
        req.flash("root", "Terjadi kesalahan saat mencoba memperbarui pengguna, coba lagi.");
        console.error("[SERVER]: Update user error.", error);
        return res.redirect("back");
    }
};
exports.updateUser = updateUser;
