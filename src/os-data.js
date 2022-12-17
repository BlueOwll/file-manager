import os from 'os';
import { InputError } from "./custom-errors.js";

export const osKeys = {
  eol: 'EOL',
  cpus: 'cpus',
  homedir: 'homedir',
  username: 'username',
  architecture: 'architecture'
}

const keyStart = '--';

export const doOs = (input) => {
  let key;
  if(input.startsWith(keyStart)) {
    key = input.slice(2);
    switch (key) {
      case osKeys.eol:
        console.log(JSON.stringify(os.EOL));
        break;
      default:
        throw new InputError('Wrong key');
    }
  }
}
