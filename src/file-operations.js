import { createReadStream, createWriteStream } from "fs";
import { access, appendFile, rename, readdir, readFile, rm } from "fs/promises";
import { resolve as resolvePath, basename, dirname } from 'path';
import { pipeline } from 'stream/promises';
import { InputError, OperationError } from "./custom-errors.js";

export const doCat = async (path) => {
  try {
    const newpath = resolvePath(process.cwd(), path);
    const result = [];
    const rd = createReadStream(newpath, { encoding: 'utf-8'});
    for await (const chunk of rd) {
      console.log(chunk);
    }
  } catch {
    throw new OperationError(`Can't create readstream`);
  } 
}

export const doAdd = async (filename) => {
  if (isFileNameCorrect(filename)) {
    const fullPath = resolvePath(filename);
    if (await isExist(fullPath)) {
      throw new OperationError(`${filename} already exists`);
    }
    try {
      await appendFile(fullPath, '');
      console.log(`New file ${filename} successfully created!`);
    } catch {
      throw new InputError('Wrong file name');
    }

  } else {
    throw new InputError('Wrong file name');
  }
}

export const doRn = async (pathSrc, newFilename) => {   
  try {
    const fullPath = resolvePath(pathSrc);
    await access(fullPath);
    const dir = dirname(fullPath);
    if (isFileNameCorrect(newFilename)) {
      try {
        await rename(fullPath, resolvePath(dir, newFilename));
        console.log(`File ${pathSrc} successfully renamed to ${newFilename}!`);
      }catch {
        throw new InputError('Wrong file name');
      }
    } else {
      throw new InputError('Wrong file name');
    } 
  } catch {
    throw new OperationError('Path does not exist');
  }  
}

export const doCp = async (pathSrc, pathDest) => {  
  try {
    const fullPathSrc = resolvePath(pathSrc);
    const checkedPathDest = resolvePath(pathDest);
   
    await readFile(fullPathSrc); 
    await access(checkedPathDest);

    const filename = basename(fullPathSrc);
    const destDirList = await readdir(checkedPathDest);

    if (destDirList.includes(filename)) {
      throw new OperationError('File already exists');
    }
    const fullPathDest =  resolvePath(checkedPathDest, filename);

    const srcStream = createReadStream(fullPathSrc);
    const destStream = createWriteStream(fullPathDest);

    await pipeline(srcStream, destStream);

    console.log(`File ${pathSrc} successfully copied to ${pathDest}!`);
  } catch {
    throw new OperationError('Impossible to copy file');
  }  
}
export const doMv = async (pathSrc, pathDest) => {  
  try {
    const fullPathSrc = resolvePath(pathSrc);
    const checkedPathDest = resolvePath(pathDest);
   
    await readFile(fullPathSrc); 
    await access(checkedPathDest);

    const filename = basename(fullPathSrc);
    const destDirList = await readdir(checkedPathDest);

    if (destDirList.includes(filename)) {
      throw new OperationError('File already exists');
    }
    const fullPathDest =  resolvePath(checkedPathDest, filename);

    const srcStream = createReadStream(fullPathSrc);
    const destStream = createWriteStream(fullPathDest);

    await pipeline(srcStream, destStream);

    await rm(fullPathSrc);

    console.log(`File ${pathSrc} successfully moved to ${pathDest}!`);
  } catch {
    throw new OperationError('Impossible to move file');
  }  
}

export const doRm = async (path) => {  
  try {
    const fullPath = resolvePath(path);
    
    await readFile(fullPath); 

    await rm(fullPath);

    console.log(`File ${path} successfully deleted!`);
  } catch {
    throw new OperationError('Impossible to delete file');
  }  
}

const isExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }  
}

const isFileNameCorrect = (filename) => {
  return filename.match(/^[^><:"?*\/\\]+[^.><:"?*\/\\]$/gi) && filename.length <= 255;
}