import { createReadStream, createWriteStream } from 'fs';
import { access, readFile, stat } from 'fs/promises';
import { resolve as resolvePath, dirname, basename } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { OperationError } from './custom-errors.js';
import { directoryExists, fileExists, isExist } from './utils.js';


export const doCompress = async (pathSrc, pathDest) => {
  const fullPathSrc = resolvePath(pathSrc);
  const fullPathDest = resolvePath(pathDest);
  if(!(await fileExists(fullPathSrc))) {
    throw new OperationError('File to compress is not found');
  }
  if(!(await directoryExists(dirname(fullPathDest)))) {
    throw new OperationError('Destination path is not found');
  }
  
  if (await isExist(fullPathDest)) {
    throw new OperationError('Destination file already exists');
  }
  try {
    const zip = createBrotliCompress();  
    const source = createReadStream(fullPathSrc);  
    const destination = createWriteStream(fullPathDest, {flags: 'w'});
    await pipeline(source, zip, destination);
    console.log(`File ${basename(fullPathSrc)} successfully compressed!`);
  } catch {
    throw new OperationError('Compressing failed');
  }
}

export const doDecompress = async (pathSrc, pathDest) => {
  const fullPathSrc = resolvePath(pathSrc);
  const fullPathDest = resolvePath(pathDest);
  if(!(await fileExists(fullPathSrc))) {
    throw new OperationError('File to decompress is not found');
  }
  if(!(await directoryExists(dirname(fullPathDest)))) {
    throw new OperationError('Destination path is not found');
  }
  
  if (await isExist(fullPathDest)) {
    throw new OperationError('Destination file already exists');
  }
  
  try {
    const unzip = createBrotliDecompress();  
    const source = createReadStream(fullPathSrc);  
    const destination = createWriteStream(fullPathDest, {flags: 'w'});
    await pipeline(source, unzip, destination);
    console.log(`File ${basename(fullPathSrc)} successfully decompressed!`);
  } catch {
    throw new OperationError('Decompressing failed');
  }
}

