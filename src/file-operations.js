import { createReadStream } from "fs";
import { resolve as resolvePath } from 'path';
import { OPERATION_FAILED_ERROR_TEXT } from "./constants.js";

export const doCat = async (path) => {
  try {
    const newpath = resolvePath(process.cwd(), path);
    console.log(newpath);
    const result = [];
    const rd = createReadStream(newpath, { encoding: 'utf-8'});
    // console.log(rd);
    for await (const chunk of rd) {
      console.log(chunk);
    }
  } catch {
    throw new Error(OPERATION_FAILED_ERROR_TEXT);
  }
 
}