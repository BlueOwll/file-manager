import os, { cpus } from 'os';
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
        showEOL();        
        break;
      case osKeys.cpus:
        showCPUs();
        break;
      case osKeys.homedir:
        showHomeDir();
        break;
      case osKeys.username:
        showUsername();
        break;
      case osKeys.architecture:
        showArchitecture();
        break;
      default:
        throw new InputError('Wrong key');
    }
  } else {
    throw new InputError('Key should start with --');
  }  
}
const showEOL = () => {
  console.log(JSON.stringify(os.EOL));
}

const showCPUs = () => {
  const cpusArr = os.cpus();
  console.log(`There are ${cpusArr.length} CPUs in system:`);
  cpusArr.forEach((item, index) => {
    console.log(`#${index}. model: ${item.model}, speed rate: ${item.speed} MHz`);
  });
}

const showHomeDir = () => {
  console.log(`Homedir is ${os.homedir()}`);
}

const showUsername = () => {
  console.log(`Username is ${os.userInfo().username}`);
}

const showArchitecture = () => {
  console.log(`Architecture is ${os.arch()}`);
}