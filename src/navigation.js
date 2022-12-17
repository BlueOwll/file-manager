import { sep, resolve as pathResolve } from 'path';
import { readdir } from 'fs/promises';
import { OPERATION_FAILED_ERROR_TEXT } from './constants.js';
import { OperationError } from './custom-errors.js';

export const doUp = () => {  
  let pathArr = process.cwd().split(sep);
  if (pathArr.length > 1) {
    pathArr = pathArr.slice(0,-1);
    if (pathArr.length === 1) pathArr.push('');
    process.chdir(pathArr.join(sep));
  }
}

export const doCd =  (path) => {
  if (path === '~') { 
    process.chdir(os.homedir());
  } else {
    try {
      process.chdir(pathResolve(path));
    } catch {
      throw new OperationError('Impossible to change dir');
    }
    //console.log(path);
  }

}

export const doLs = async () => {
  const columns = {
    index: 'Index',
    name: 'Name',
    type: 'Type'
  };
  const indexwidth = 7;
  const namewidthMin = 40;
  const typewidth = 10;
  try {
    const arr = await readdir(process.cwd(),{ withFileTypes: true });
    const arrtoprint = arr.map((item, index) => {
      const res = {};
      res.index = index;
      res.name = item.name;
      if (item.isDirectory()) {
        res.type = 'dir';
      } else if (item.isFile()) {
        res.type = 'file';
      } else if (item.isSymbolicLink()) {
        res.type = 'symlink';
      } else {
        res.type = 'unknown';
      }
      return res;
    }).sort((a,b) => a.name >= b.name ? 1 : -1).sort((a,b) => a.type >= b.type ? 1 : -1);
    
    let namewidth = arrtoprint.reduce((acc, item) => acc > item.name.length ? acc :  item.name.length, 0) + 1;
    namewidth = namewidth > namewidthMin ? namewidth : namewidthMin;

    console.log(`┌${'─'.repeat(indexwidth)}┬${'─'.repeat(namewidth)}┬${'─'.repeat(typewidth)}┐`);
    console.log(`│ ${columns.index} │${' '.repeat(Math.ceil((namewidth - columns.name.length)/2))}${columns.name}${' '.repeat(Math.floor((namewidth - columns.name.length)/2))}│${' '.repeat(Math.ceil((typewidth - columns.type.length)/2))}${columns.type}${' '.repeat(Math.floor((typewidth - columns.type.length)/2))}│`);
    console.log(`├${'─'.repeat(indexwidth)}┼${'─'.repeat(namewidth)}┼${'─'.repeat(typewidth)}┤`);

    arrtoprint.forEach((item,ind) => {
      const filename = item.name.length >= namewidth ? `${item.name.slice(0, namewidth - 3)}...` : item.name;
      console.log(`│${' '.repeat(Math.ceil((indexwidth - (ind + 1).toString().length)/2))}${ind + 1}${' '.repeat(Math.floor((indexwidth - (ind + 1).toString().length)/2))}│ ${filename}${' '.repeat(namewidth - filename.length - 1)}│${' '.repeat(Math.ceil((typewidth - item.type.length)/2))}${item.type.toUpperCase()}${' '.repeat(Math.floor((typewidth - item.type.length)/2))}│`);
    });
    console.log(`└${'─'.repeat(indexwidth)}┴${'─'.repeat(namewidth)}┴${'─'.repeat(typewidth)}┘`);
  } catch (e){
    throw new OperationError('Impossible to read dir');
  }
}

