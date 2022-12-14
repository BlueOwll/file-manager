import { sep, join as pathJoin, resolve as pathResolve } from 'path';
export const doUp = () => {
  
  let pathArr = process.cwd().split(sep);
  if (pathArr.length > 1) {
    pathArr = pathArr.slice(0,-1);
    if (pathArr.length === 1) pathArr.push('');
    process.chdir(pathArr.join(sep));
  }
}

export const doCd =  (path) => {
  try {
    process.chdir(pathResolve(path));
  } catch {
    throw new Error ();
  }
  //console.log(path);
}

