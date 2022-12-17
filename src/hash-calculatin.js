import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { resolve as resolvePath } from 'path';
import { OperationError } from './custom-errors.js';

export const doHash = async (path) => {
  const fullPath = resolvePath(path);
  const hash = createHash('sha256');
  
  await readFile(fullPath, { encoding: 'utf8' })
      .then((res) => { 
        console.log(hash.update(res).digest('hex'));
        })
      .catch(() => { throw new OperationError('No such file')})
  
  
}
