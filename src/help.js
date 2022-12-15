import { commands } from "./constants.js";
const showHelp = () => {
  console.log('Following commands are supported:');
  console.log(`  ${commands.help} - help`);
  console.log(`  ${commands.exit} - exit`);
  console.log(`  ${commands.up} - go upper from current directory`);
  console.log(`  ${commands.cd} path_to_dir - go to dedicated folder from current directory `);
  console.log(`  ${commands.ls} - print list of all files and folders in current directory`);
  console.log(`  ${commands.cat} path_to_file - Read file and print it's content in console`);
}
export default showHelp;