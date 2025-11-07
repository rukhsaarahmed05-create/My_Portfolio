// import { storage } from '../../storage';
import { storage } from '@server/storage';
export default async function handler(req, res) {
    try {
        const id = parseInt(req.query.id);
        const project = await storage.getProject(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch project' });
    }
}
