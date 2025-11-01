import { VercelRequest, VercelResponse } from "@vercel/node";
import { skills } from "../server/storage.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json(skills);
}
