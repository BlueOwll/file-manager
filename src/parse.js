import { readdir } from 'fs/promises';
import { INVALID_INPUT_ERROR_TEXT, commands, OPERATION_FAILED_ERROR_TEXT } from './constants.js';
import showHelp from './help.js';
import { doUp, doCd } from './navigation.js';

const parseCommand = async (data) => {
  const args = data.split(' ');
  if (args.length === 1) { // commands without args
    switch (args[0].trim()) {
      case commands.help:
        showHelp();
        break;
      case commands.up:
          doUp();
        break;
      case commands.ls:
        try {
          await doLs();
        } catch {
          throw new Error(OPERATION_FAILED_ERROR_TEXT);
        }   
        console.log(await readdir(process.cwd()));
        break;
      default:
        throw new Error(INVALID_INPUT_ERROR_TEXT);     
    }
  } else if (args.length === 2) {// commands with one arg
    switch (args[0].trim()) {
       case commands.cd:
          try{
            doCd(args[1].trim());
          } catch {
            throw new Error(OPERATION_FAILED_ERROR_TEXT);
          }        
        break;
        
        default:
          throw new Error(INVALID_INPUT_ERROR_TEXT);     
    }
  }
 

}

export default parseCommand;