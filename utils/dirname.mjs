import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const pwd = path.dirname(__filename);
export const __dirname = path.join(pwd, "..");
