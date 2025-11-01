import { projects } from "../server/storage.js"; // ✅ note the .js
export default function handler(req, res) {
  res.status(200).json(projects);
}
