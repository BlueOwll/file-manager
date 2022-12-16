import { createReadStream } from "fs";
import { access, appendFile, rename } from "fs/promises";
import { resolve as resolvePath, basename, dirname } from 'path';
import { OPERATION_FAILED_ERROR_TEXT, INVALID_INPUT_ERROR_TEXT } from "./constants.js";

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

export const doAdd = async (path) => {
  if (path.match(/^[^><:"?*\/\\]+[^.><:"?*\/\\]$/gi) && path.length <= 255) {
    try {
      await access(path);
      throw new Error(OPERATION_FAILED_ERROR_TEXT);
    } catch {
      try {
        await appendFile(path, '');
      } catch {
        throw new Error(INVALID_INPUT_ERROR_TEXT);
      }
    }  
  } else {
    throw new Error(INVALID_INPUT_ERROR_TEXT);
  } 
}

export const doRn = async (pathSrc, newFilename) => { // TODO
  
  try {
    const fullPath = resolvePath(pathSrc);
    console.log(fullPath);
    await access(fullPath);
    const dir = dirname(fullPath);
    console.log(dir + '  ' + newFilename);
    if (newFilename.match(/^[^><:"?*\/\\]+[^.><:"?*\/\\]$/gi) && newFilename.length <= 255) {
      console.log(resolvePath(dir, newFilename));
      try {
        await rename(fullPath, resolvePath(dir, newFilename));
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

const isExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }  
}