// import { storage } from '../../storage';
// import { storage } from '../../../server/storage';
import { storage } from '@server/storage';
export default async function handler(req, res) {
    try {
        const category = req.query.category;
        const projects = await storage.getProjects(category);
        res.status(200).json(projects);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
}
