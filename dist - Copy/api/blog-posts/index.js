"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// import { storage } from '../../storage';
// import { storage } from '@server/storage';
const storage_js_1 = require("@server/storage.js"); // only after tsc-alias replaces it
async function handler(req, res) {
    try {
        const publishedStr = String(req.query.published || '');
        const published = publishedStr.toLowerCase() === 'true' || publishedStr === '1';
        const q = String(req.query.q || '');
        let blogPosts = await storage_js_1.storage.getBlogPosts(publishedStr ? published : undefined);
        if (q) {
            const searchTerm = q.toLowerCase();
            blogPosts = blogPosts.filter(post => post.title.toLowerCase().includes(searchTerm) ||
                post.excerpt.toLowerCase().includes(searchTerm) ||
                post.category.toLowerCase().includes(searchTerm));
        }
        res.status(200).json(blogPosts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
}
