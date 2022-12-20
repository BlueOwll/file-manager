import { access,  stat } from 'fs/promises';

export const isExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }  
}
export const directoryExists = async (path) => {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

export const fileExists = async (path) => {
  try {
    if ((await stat(path)).isFile()) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
