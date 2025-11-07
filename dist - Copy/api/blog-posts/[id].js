// import { storage } from '../../storage';
import { storage } from '@server/storage';
export default async function handler(req, res) {
    try {
        const id = parseInt(req.query.id);
        const blogPost = await storage.getBlogPost(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blogPost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch blog post' });
    }
}
