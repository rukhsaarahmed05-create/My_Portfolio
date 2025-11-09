"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// import { storage } from '../../storage';
// import { storage } from '../../../server/storage';
const storage_1 = require("@server/storage");
async function handler(req, res) {
    try {
        const category = req.query.category;
        const projects = await storage_1.storage.getProjects(category);
        res.status(200).json(projects);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
}
