import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ 
    message: "Test endpoint works!",
    slug: req.query.slug || "no slug provided"
  });
}
