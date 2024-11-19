import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, 'dist');
const siteDir = path.join(__dirname, '..', 'site');

// build 폴더의 내용을 site 폴더로 복사
fs.copy(buildDir, siteDir, (err) => {
  if (err) {
    console.error('An error occurred while copying the folder.', err);
    return;
  }
  console.log('Build files have been successfully copied to the site folder!');
});