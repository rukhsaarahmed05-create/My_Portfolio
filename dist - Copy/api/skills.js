// import { storage } from '../storage';
import { storage } from '@server/storage';
export default async function handler(req, res) {
    try {
        const skills = await storage.getSkills();
        res.status(200).json(skills);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch skills' });
    }
}
