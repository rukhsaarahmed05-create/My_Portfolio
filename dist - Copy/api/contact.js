"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// import { storage } from '../storage';
const storage_1 = require("@server/storage");
const schema_1 = require("@shared/schema");
const zod_1 = require("zod");
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const validatedData = schema_1.insertContactSchema.parse(req.body);
        const contact = await storage_1.storage.createContact(validatedData);
        res.status(201).json({
            message: 'Contact form submitted successfully',
            id: contact.id,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: 'Invalid form data', errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: 'Failed to submit contact form' });
    }
}
