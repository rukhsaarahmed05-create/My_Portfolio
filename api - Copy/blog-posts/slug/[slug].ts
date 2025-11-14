import { VercelRequest, VercelResponse } from '@vercel/node';
// import { storage } from '../../../storage';
import { storage } from '@server/storage';



export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const slug = req.query.slug as string;
    const blogPost = await storage.getBlogPostBySlug(slug);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
}

