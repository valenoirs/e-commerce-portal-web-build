"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAdmin = exports.updateAdmin = exports.signOut = exports.signUp = exports.signIn = void 0;
const admin_1 = require("../models/admin");
const config_1 = __importDefault(require("../config/config"));
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admin_1.Admin.findOne({ email });
        if (!admin) {
            req.flash("error", "Email belum terdaftar.");
            console.log("[SERVER]: Email not registered");
            return res.redirect("/signin");
        }
        if (password !== admin.password) {
            req.flash("error", "Password salah.");
            console.log("[SERVER]: Incorrect password");
            return res.redirect("/signin");
        }
        const { id, name, isOpen } = admin;
        const adminSession = {
            id,
            name,
            email,
            isOpen,
        };
        req.session.admin = adminSession;
        console.log("[SERVER]: Admin logged in.");
        return res.redirect("/");
    }
    catch (error) {
        req.flash("error", "Terjadi kesalahan saat mencoba masuk, coba lagi.");
        console.error("[SERVER]: Sign in error.", error);
        return res.redirect("/signin");
    }
};
exports.signIn = signIn;
const signUp = async (req, res) => {
    try {
        const pirtCertificate = req.files.pirt[0];
        const halalCertificate = req.files.halal[0];
        const { email, phone } = req.body;
        const admin = await admin_1.Admin.findOne({ email });
        if (admin) {
            req.flash("error", "Email sudah terdaftar sebagai admin.");
            console.log("[SERVER]: Email already existed.");
            return res.redirect("/signup");
        }
        if (admin && admin.phone === phone) {
            req.flash("error", "Nomor HP sudah terdaftar sebagai admin.");
            console.log("[SERVER]: Phone already existed.");
            return res.redirect("/signup");
        }
        const { password, passwordConfirmation } = req.body;
        if (password.length < 8) {
            req.flash("error", "Password harus lebih dari 8 karakter.");
            console.log("[SERVER]: Password length less than 8.");
            return res.redirect("/signup");
        }
        if (password !== passwordConfirmation) {
            req.flash("error", "Konfirmasi Password gagal.");
            console.log("[SERVER]: Password Confirmation failed.");
            return res.redirect("/signup");
        }
        req.body.certificatePIRT = `/upload/certificate/${pirtCertificate.filename}`;
        req.body.certificateHalal = `/upload/certificate/${halalCertificate.filename}`;
        delete req.body.passwordConfirmation;
        await new admin_1.Admin(req.body).save();
        console.log("[SERVER]: New Admin added");
        req.flash("error", "Akun berhasil didaftarkan, silahkan masuk untuk melanjutkan.");
        return res.redirect("/signin");
    }
    catch (error) {
        req.flash("error", "Terjadi kesalahan saat melakukan pendaftaran, coba lagi.");
        console.error("[SERVER]: Sign up error.", error);
        return res.redirect("/signup");
    }
};
exports.signUp = signUp;
const signOut = async (req, res) => {
    try {
        if (!req.session.admin) {
            req.flash("error", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
            console.log("[SERVER]: No session id provided.");
            return res.redirect("/");
        }
        const { email } = req.session.admin;
        req.session.destroy((error) => {
            if (error)
                throw error;
            res.clearCookie(config_1.default.SESSION_COLLECTION_NAME);
            console.log(`[SERVER]: ${email} signed out.`);
            return res.redirect("/");
        });
    }
    catch (error) {
        req.flash("error", "Terjadi kesalahan saat mencoba keluar, coba lagi.");
        console.error("[SERVER]: Sign out error.", error);
        return res.redirect("/");
    }
};
exports.signOut = signOut;
const updateAdmin = async (req, res) => {
    console.log(req.body);
    try {
        const { id } = req.session.admin;
        if (req.query.updateToko) {
            let isOpen = true;
            let notification = "Toko dibuka.";
            if (req.body.isOpen === "true") {
                isOpen = false;
                notification = "Toko ditutup.";
            }
            await admin_1.Admin.findByIdAndUpdate(id, { $set: { isOpen } });
            req.session.admin.isOpen = isOpen;
            console.log("BUKA TOKO");
            req.flash("admin", notification);
            console.log("[SERVER]: Toko information updated.");
            return res.redirect("/");
        }
        await admin_1.Admin.findByIdAndUpdate(id, { $set: req.body });
        req.flash("admin", "Informasi Toko berhasil diperbarui.");
        console.log("[SERVER]: Admin information updated.");
        return res.redirect("/");
    }
    catch (error) {
        req.flash("admin", "Informasi Toko gagal diperbarui, coba lagi.");
        console.error("[SERVER]: Admin/Toko information update error.");
        return res.redirect("/");
    }
};
exports.updateAdmin = updateAdmin;
const readAdmin = async (req, res) => {
    try {
        const { search } = req.query;
        let admin;
        search
            ? (admin = await admin_1.Admin.find({ name: { $regex: search, $options: "i" } }))
            : (admin = await admin_1.Admin.find());
        return res.status(200).send({
            success: true,
            status: 200,
            data: {
                admin,
            },
        });
    }
    catch (error) {
        return res.status(500).send({
            error: true,
            status: 500,
            type: "GetAdminError",
            data: {
                message: "Something went wrong while getting admin data, please try again.",
            },
        });
    }
};
exports.readAdmin = readAdmin;
