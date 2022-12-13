import { Console } from 'console';
import  readline from 'readline';
const USER_KEY = '--username';
const commands = {
  exit: '.exit',
}


let username;

export const app = (args) => {
  const initArgs = args[0].split('=');
  if (initArgs.length > 0 && initArgs[0] === USER_KEY) {
    username = initArgs[1].trim();
    console.log(`Welcome to the File Manager, ${username}!`);

  } else {
    console.log(`Wrong init parameters, format for starting: npm run start -- --username=YourUsername`);
    process.exit(1);
  }
  const rl = readline.createInterface(process.stdin);
  rl.on('line', (data) => {
    switch (data) {
      case commands.exit:
        appExit();  
        break;
      
    }
  });
  process.on('SIGINT',()=>{
    appExit()  
  });
}

const appExit = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);   
  process.exit();  
}
