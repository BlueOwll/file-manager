import  readline from 'readline';
import os from 'os';
import { INVALID_INPUT_ERROR_TEXT, commands } from './constants.js';
const USER_KEY = '--username';


let username;
let currentDir;

export const app = (args) => {
  const initArgs = args[0].split('=');
  if (initArgs.length === 2 && initArgs[0] === USER_KEY) {
    username = initArgs[1].trim();
    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`Enter 'help' for help`);

  } else {
    console.log(`Wrong init parameters, format for starting: npm run start -- --username=YourUsername`);
    process.exit(1);
  }

  process.chdir(os.homedir());
  currentDir = process.cwd();

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.setPrompt('Enter command >');
  rl.prompt();

  rl.on('line', (data) => {
    switch (data) {
      case commands.exit:
        appExit();  
        break;
      case commands.help:
        showHelp();
        break;
      default:
        console.log(INVALID_INPUT_ERROR_TEXT);      
    }
    console.log(`You are currently in ${currentDir}`); //TODO
    rl.prompt();
  });

  rl.on('SIGINT', () => {
    appExit();
  });
}

const appExit = () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);   
  process.exit();  
}
