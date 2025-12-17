import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const slug = req.query.slug as string;
    
    console.log('📌 Received slug:', slug);  // Debug log
    
    if (!slug) {
      console.log('❌ No slug provided');
      return res.status(400).json({ message: 'Blog slug is required' });
    }
    
    const blogPost = await storage.getBlogPostBySlug(slug);
    
    console.log('📝 Found blog post:', blogPost ? blogPost.title : 'NOT FOUND');  // Debug log
    
    if (!blogPost) {
      console.log('❌ Blog post not found in storage');
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    console.log('✅ Returning blog post');
    res.status(200).json(blogPost);
  } catch (error) {
    console.error('🔥 Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
}