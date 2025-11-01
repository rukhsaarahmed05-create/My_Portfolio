import { skills } from "../server/storage.js";
export default function handler(req, res) {
  res.status(200).json(skills);
}
