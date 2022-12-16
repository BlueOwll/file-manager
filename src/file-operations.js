import { createReadStream, createWriteStream } from "fs";
import { access, appendFile, rename, readdir, copyFile, readFile } from "fs/promises";
import { resolve as resolvePath, basename, dirname } from 'path';
import { OPERATION_FAILED_ERROR_TEXT, INVALID_INPUT_ERROR_TEXT } from "./constants.js";
import { promisify } from 'util';
import { pipeline } from 'stream/promises';

export const doCat = async (path) => {
  try {
    const newpath = resolvePath(process.cwd(), path);
    const result = [];
    const rd = createReadStream(newpath, { encoding: 'utf-8'});
    for await (const chunk of rd) {
      console.log(chunk);
    }
  } catch {
    throw new Error(OPERATION_FAILED_ERROR_TEXT);
  } 
}

export const doAdd = async (filename) => {
  if (isFileNameCorrect(filename)) {
    try {
      await access(resolvePath(filename));
      throw new Error(OPERATION_FAILED_ERROR_TEXT);
    } catch {
      try {
        await appendFile(filename, '');
        console.log(`New file ${filename} successfully created!`);
      } catch {
        throw new Error(INVALID_INPUT_ERROR_TEXT);
      }
    }  
  } else {
    throw new Error(INVALID_INPUT_ERROR_TEXT);
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
        throw new Error(INVALID_INPUT_ERROR_TEXT);
      }
    } else {
      throw new Error(INVALID_INPUT_ERROR_TEXT);
    } 
  } catch {
    throw new Error(OPERATION_FAILED_ERROR_TEXT);
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
      throw new Error(OPERATION_FAILED_ERROR_TEXT);
    }
    const fullPathDest =  resolvePath(checkedPathDest, filename);

    const srcStream = createReadStream(fullPathSrc);
    const destStream = createWriteStream(fullPathDest);

    await pipeline(srcStream, destStream);
    
    console.log(`File ${pathSrc} successfully copied to ${pathDest}!`);
  } catch {
    throw new Error(OPERATION_FAILED_ERROR_TEXT);
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