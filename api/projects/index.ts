import { VercelRequest, VercelResponse } from '@vercel/node';
// import { storage } from '../../storage';
// import { storage } from '../../../server/storage';
// import { storage } from '../../../server/storage';
import { storage } from '../../server/storage.js';


export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const category = req.query.category as string | undefined;
    const projects = await storage.getProjects(category);
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
}
