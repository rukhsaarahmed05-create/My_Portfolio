"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// import { storage } from '../storage';
const storage_1 = require("@server/storage");
async function handler(req, res) {
    try {
        const skills = await storage_1.storage.getSkills();
        res.status(200).json(skills);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch skills' });
    }
}
