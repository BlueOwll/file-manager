import { createReadStream, createWriteStream } from "fs";
import { access, appendFile, rename, readdir, readFile, rm } from "fs/promises";
import { resolve as resolvePath, basename, dirname } from 'path';
import { pipeline } from 'stream/promises';
import { InputError, OperationError } from "./custom-errors.js";
import { directoryExists, fileExists, isExist } from "./utils.js";

export const doCat = async (path) => {
  try {
    const newpath = resolvePath(process.cwd(), path);
    const result = [];
    const rd = createReadStream(newpath, { encoding: 'utf-8'});
    for await (const chunk of rd) {
      console.log(chunk);
    }
  } catch {
    throw new OperationError(`No such file`);
  } 
}

export const doAdd = async (filename) => {
  if (isFileNameCorrect(filename)) {
    const fullPath = resolvePath(filename);
    if (await fileExists(fullPath)) {
      throw new OperationError(`${filename} already exists`);
    }
    try {
      await appendFile(fullPath, '');
      console.log(`New file ${filename} successfully created!`);
    } catch {
      throw new OperationError('Wrong file name');
    }

  } else {
    throw new InputError('Wrong file name');
  }
}

export const doRn = async (pathSrc, newFilename) => {
  const fullPath = resolvePath(pathSrc);
  try {
    await readFile(fullPath);
  } catch {
    throw new OperationError('File does not exist');
  }
  const fullNewPath = resolvePath(dirname(fullPath), newFilename);

  if (await fileExists(fullNewPath)) {
    throw new OperationError(`${newFilename} already exists`);
  }

  if (isFileNameCorrect(newFilename)) {
    try {
      await rename(fullPath, fullNewPath);
      console.log(`File ${pathSrc} successfully renamed to ${newFilename}!`);
    } catch {
      throw new OperationError('Wrong file name');
    }
  } else {
    throw new InputError('Wrong file name');
  }
}

export const doCp = async (pathSrc, pathDest) => {  
    const fullPathSrc = resolvePath(pathSrc);
    const checkedPathDest = resolvePath(pathDest);
   
    try {
      await readFile(fullPathSrc);
    } catch {
      throw new OperationError(`File ${fullPathSrc} does not exist`);
    }

    if (!(await directoryExists(checkedPathDest))) {
      throw new OperationError('Dest path does not exist');
    }
    
    const filename = basename(fullPathSrc);
    const fullPathDest =  resolvePath(checkedPathDest, filename);

    if (await isExist(fullPathDest)) {
      throw new OperationError(`File ${fullPathDest} already exists`);
    }    
    try{
    const srcStream = createReadStream(fullPathSrc);
    const destStream = createWriteStream(fullPathDest);

    await pipeline(srcStream, destStream);

    console.log(`File ${pathSrc} successfully copied to ${pathDest}!`);
  } catch {
    throw new OperationError('Impossible to copy file');
  }  
}
export const doMv = async (pathSrc, pathDest) => {
  const fullPathSrc = resolvePath(pathSrc);
  const checkedPathDest = resolvePath(pathDest);

  try {
    await readFile(fullPathSrc);
  } catch {
    throw new OperationError(`File ${fullPathSrc} does not exist`);
  }

  if (!(await directoryExists(checkedPathDest))) {
    throw new OperationError('Dest path does not exist');
  }

  const filename = basename(fullPathSrc);
  const fullPathDest = resolvePath(checkedPathDest, filename);

  if (await isExist(fullPathDest)) {
    throw new OperationError(`File ${fullPathDest} already exists`);
  }
  try {
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

  const fullPath = resolvePath(path);
  if (!(await fileExists(fullPath))) {
    throw new OperationError(`File ${fullPath} does not exist`);
  }
  try {
    await rm(fullPath);

    console.log(`File ${path} successfully deleted!`);
  } catch {
    throw new OperationError('Impossible to delete file');
  }
}



const isFileNameCorrect = (filename) => {
  return filename.match(/^[^><:"?*\/\\]+[^.><:"?*\/\\]$/gi) && filename.length <= 255;
}