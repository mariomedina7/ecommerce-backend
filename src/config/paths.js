import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootPath = __dirname;
export const viewsPath = path.join(__dirname, '../views');
export const publicPath = path.join(__dirname, '../../public');