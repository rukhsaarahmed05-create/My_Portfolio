import { VercelRequest, VercelResponse } from '@vercel/node';
// import { storage } from '../storage';
// import { storage } from '@server/storage';
import { storage } from '../server/storage.js'; // relative path to your storage file


import { insertContactSchema } from '../shared/schema.js';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid form data', errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
}




// // api/contact.ts
// import type { VercelRequest, VercelResponse } from '@vercel/node';
// import { z } from 'zod';

// // Use relative paths here for Vercel compatibility
// import { storage } from '../server/storage.js'; // relative path to your storage file

// // Zod schema for validating the contact payload
// const insertContactSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email"),
//   message: z.string().min(1, "Message is required")
// });

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   try {
//     if (req.method !== 'POST') {
//       return res.status(405).json({ error: 'Method not allowed' });
//     }

//     // Validate request body
//     const parsed = insertContactSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({ error: parsed.error.format() });
//     }

//     const contactData = parsed.data;

//     // Save contact to your storage
//     await storage.contacts.insert(contactData);

//     res.status(200).json({ message: 'Contact saved successfully' });
//   } catch (err: any) {
//     console.error('Contact API error:', err);
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// }
