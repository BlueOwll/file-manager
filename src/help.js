import { commands } from "./constants.js";
export default showHelp = () => {
  console.log('Following commands are supported:');
  console.log(`  ${commands.help} - help`);
  console.log(`  ${commands.exit} - exit`);

}