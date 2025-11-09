import { VercelRequest, VercelResponse } from '@vercel/node';
// import { storage } from '../storage';
// import { storage } from '@server/storage';

import { storage } from '../server/storage.js'; // relative path to your storage file




export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const skills = await storage.getSkills();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
}

