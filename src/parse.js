
import { INVALID_INPUT_ERROR_TEXT, commands } from './constants.js';
import showHelp from './help.js';
import { doUp, doCd, doLs } from './navigation.js';
import { doAdd, doCat, doRn, doCp, doMv, doRm } from './file-operations.js';

const parseCommand = async (data) => {
  const args = data.split(' ');
  try{
  if (args.length === 1) { // commands without args
    switch (args[0].trim()) {
      case commands.help:
        showHelp();
        break;
      case commands.up:
        doUp();
        break;
      case commands.ls:
        await doLs();
        break;
      default:
        throw new Error(INVALID_INPUT_ERROR_TEXT);     
    }
  } else if (args.length === 2) {// commands with one arg
    switch (args[0].trim()) {
      case commands.cd:       
        doCd(args[1].trim());            
        break;
      case commands.cat:
        await doCat(args[1].trim());
        break;    
      case commands.add:
        await doAdd(args[1].trim());
        break;         
      case commands.rm:
        await doRm(args[1].trim());
        break;     
      default:
        throw new Error(INVALID_INPUT_ERROR_TEXT);     
    }
  } else if (args.length === 3) {// commands with two arg
    switch (args[0].trim()) {
      case commands.rn:       
        await doRn(args[1].trim(), args[2].trim());            
        break;
      case commands.cp:       
        await doCp(args[1].trim(), args[2].trim());            
        break;
      case commands.mv:       
        await doMv(args[1].trim(), args[2].trim());            
        break;
      default:
        throw new Error(INVALID_INPUT_ERROR_TEXT);     
    }
  }
    else {
    throw new Error(INVALID_INPUT_ERROR_TEXT);     
  }
} catch (e){
  throw new Error(e.message);
}     
 

}

export default parseCommand;