/*
MIT License

Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
Mindoro State University - Philippines

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Product } from "../models/Product.js";

export const product = {

    insert: async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);

            res.status(201).json(newProduct);
        }
        catch (err) {
            res.status(err.name === "SequelizeValidationError" ? 400 : 500).json({
                error: err.message
            });
        }
    },

    all: async (req, res) => {
        try {
            const prod = await Product.findAll();

            res.json({
                prod
            });
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    isa: async (req, res) => {
        try {
            const { id } = req.params;

            const data = await Product.findByPk(id);

            if (!data) {
                return res.status(404).json({
                    error: "Product not found"
                });
            }

            res.json({
                data
            });
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Product.findByPk(id);

            if (!data) {
                return res.status(404).json({ error: "Product not found" });
            }

            await data.update(req.body);
            res.json({ data });
        }
        catch (err) {
            res.status(err.name === "SequelizeValidationError" ? 400 : 500).json({
                error: err.message
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Product.findByPk(id);

            if (!data) {
                return res.status(404).json({ error: "Product not found" });
            }

            await data.destroy();
            res.json({ message: "Product deleted successfully" });
        }
        catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

};
