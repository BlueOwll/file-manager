import { commands } from "./constants.js";
import { osKeys } from "./os-data.js";
const showHelp = () => {
  console.log('Following commands are supported:');
  console.log(`  ${commands.help}    - help`);
  console.log(`  ${commands.exit}    - exit (the same as Ctrl+C)`);
  console.log(`  ${commands.up}    - go upper from current directory`);
  console.log(`  ${commands.cd} path_to_dir    - go to dedicated folder from current directory `);
  console.log(`  ${commands.ls}    - print list of all files and folders in current directory`);
  console.log(`  ${commands.cat} path_to_file    - Read file and print it's content in console`);
  console.log(`  ${commands.add} new_file_name    - Create empty file in current working directory`);
  console.log(`  ${commands.rn} path_to_file new_file_name    - Rename file`);
  console.log(`  ${commands.cp} path_to_file path_to_new_directory    - Copy file`);
  console.log(`  ${commands.mv} path_to_file path_to_new_directory    - Move file`);
  console.log(`  ${commands.rm} path_to_file    - Delete file`);
  console.log(`  ${commands.os} --${osKeys.eol}    - Show EOL (default system End-Of-Line)`);
  console.log(`  ${commands.os} --${osKeys.cpus}    - Show host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them`);
  console.log(`  ${commands.os} --${osKeys.homedir}    - Show  home directory`);
  console.log(`  ${commands.os} --${osKeys.username}    - Show current system user name`);
  console.log(`  ${commands.os} --${osKeys.architecture}    - Show CPU architecture for which Node.js binary has compiled`);
  console.log(`  ${commands.hash} path_to_file    - Calculate hash for file and print it into console`);
  console.log(`  ${commands.compress} path_to_file path_to_destination    - Compress file (using Brotli algorithm)`);
  console.log(`  ${commands.decompress} path_to_file path_to_destination    - Decompress file (using Brotli algorithm)`);
}
export default showHelp;
