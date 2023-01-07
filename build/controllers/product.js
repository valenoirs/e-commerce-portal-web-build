"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const product_1 = require("../models/product");
const createProduct = async (req, res) => {
    try {
        if (!req.file) {
            req.flash('product', 'Format gambar tidak sesuai.');
            console.log('[SERVER]: Incorrect image format.');
            return res.redirect('/');
        }
        const { filename } = req.file;
        req.body.picture = `/upload/product/${filename}`;
        req.body.adminId = req.session.admin.id;
        req.body.admin = req.session.admin.name;
        await new product_1.Product(req.body).save();
        req.flash('product', 'Product baru berhasil ditambahkan.');
        console.log('[SERVER]: New product added.');
        return res.redirect('/');
    }
    catch (error) {
        req.flash('product', 'Terjadi kesalahan saat menambahkan product, coba lagi.');
        console.error('[SERVER]: Add new product error.\n', error);
        return res.redirect('/');
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (req.query.updateStock) {
            let available = true;
            if (req.body.available === 'true') {
                available = false;
            }
            await product_1.Product.findByIdAndUpdate(productId, {
                $set: {
                    available,
                },
            });
            req.flash('product', 'Ketersediaan produk berhasil diperbarui.');
            console.log('[SERVER]: Product stock updated.');
            return res.redirect('/');
        }
        const product = await product_1.Product.findOne({ id: productId });
        if (!product) {
            req.flash('product', 'Product yang ingin diubah tidak ditemukan.');
            console.log('[SERVER]: Product not found.');
            return res.redirect('/');
        }
        if (req.file) {
            const { filename } = req.file;
            req.body.picture = `/upload/product/${filename}`;
        }
        await product_1.Product.updateOne({ id: productId }, { $set: req.body });
        req.flash('product', 'Informasi produk berhasil diperbarui.');
        console.log('[SERVER]: Product information updated');
        return res.redirect('/');
    }
    catch (error) {
        req.flash('product', 'Terjadi kesalahan saat mengubah product, coba lagi.');
        console.error('[SERVER]: Add new product error.\n', error);
        return res.redirect('/');
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await product_1.Product.findById(productId);
        if (!product) {
            req.flash('product', 'Product yang ingin dihapus tidak ditemukan.');
            console.log('[SERVER]: Product not found.');
            return res.redirect('/');
        }
        await product_1.Product.findByIdAndDelete(productId);
        req.flash('product', 'Product berhasil dihapus.');
        console.log('[SERVER]: Product deleted.');
        return res.redirect('/');
    }
    catch (error) {
        req.flash('product', 'Terjadi kesalahan saat menghapus product, coba lagi.');
        console.error('[SERVER]: Delete product error.\n', error);
        return res.redirect('/');
    }
};
exports.deleteProduct = deleteProduct;
const readProduct = async (req, res) => {
    try {
        let product;
        const { adminId, search } = req.query;
        product = await product_1.Product.find();
        if (adminId) {
            product = await product_1.Product.find({ adminId });
        }
        if (search) {
            product = await product_1.Product.find({ name: { $regex: search, $options: 'i' } });
        }
        return res.status(200).send({
            success: true,
            status: 200,
            data: {
                product,
            },
        });
    }
    catch (error) {
        return res.status(500).send({
            error: true,
            status: 500,
            type: 'GetProductError',
            data: {
                message: 'Something went wrong while getting product data, please try again.',
            },
        });
    }
};
exports.readProduct = readProduct;
