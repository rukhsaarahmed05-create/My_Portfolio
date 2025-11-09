"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// import { storage } from '../../../storage';
const storage_1 = require("@server/storage");
async function handler(req, res) {
    try {
        const slug = req.query.slug;
        const blogPost = await storage_1.storage.getBlogPostBySlug(slug);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blogPost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch blog post' });
    }
}
