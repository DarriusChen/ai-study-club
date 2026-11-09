import { cpSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
for (const course of readdirSync(join(root, 'courses'), { withFileTypes: true })) {
  if (!course.isDirectory()) continue;
  for (const folder of ['slides', 'downloads']) {
    const source = join(root, 'courses', course.name, folder);
    if (!existsSync(source)) continue;
    cpSync(source, join(root, 'public', 'courses', course.name, folder), {
      recursive: true,
      filter: (path) => !path.endsWith('/README.md'),
    });
  }
}
