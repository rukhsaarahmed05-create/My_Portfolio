// import { storage } from '../storage';
import { storage } from '@server/storage';
import { insertContactSchema } from '@shared/schema';
import { z } from 'zod';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const validatedData = insertContactSchema.parse(req.body);
        const contact = await storage.createContact(validatedData);
        res.status(201).json({
            message: 'Contact form submitted successfully',
            id: contact.id,
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Invalid form data', errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: 'Failed to submit contact form' });
    }
}
