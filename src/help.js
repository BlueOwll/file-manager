import { commands } from "./constants.js";
const showHelp = () => {
  console.log('Following commands are supported:');
  console.log(`  ${commands.help} - help`);
  console.log(`  ${commands.exit} - exit (the same as Ctrl+C)`);
  console.log(`  ${commands.up} - go upper from current directory`);
  console.log(`  ${commands.cd} path_to_dir - go to dedicated folder from current directory `);
  console.log(`  ${commands.ls} - print list of all files and folders in current directory`);
  console.log(`  ${commands.cat} path_to_file - Read file and print it's content in console`);
  console.log(`  ${commands.add} new_file_name - Create empty file in current working directory`);
  console.log(`  ${commands.rn} path_to_file new_file_name - Rename file`);
  console.log(`  ${commands.cp} path_to_file path_to_new_directory - Copy file`);
}
export default showHelp;