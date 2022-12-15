import { createReadStream } from "fs";
import { access, appendFile } from "fs/promises";
import { resolve as resolvePath } from 'path';
import { OPERATION_FAILED_ERROR_TEXT } from "./constants.js";

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
  // regexp
  try {
    await access(path);
    throw new Error(OPERATION_FAILED_ERROR_TEXT);
  } catch {
    await appendFile(path, '');
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