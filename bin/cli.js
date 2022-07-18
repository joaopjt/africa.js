const moment = require('moment');
const { fs } = require('node:fs');
const { green } = require('colorette');
const { program } = require('commander');
const { version } = require('../package.json');

program
  .name('África.js ORM Command line Interface')
  .description('CLI access of África.js Query Builder/ORM.')
  .version('0.8.0');

const env_string = (host, user, pass, db) => {
  return `HOST: ${host}\nUSER: ${user}\nPASS: ${pass}\nDATABASE: ${database}`;
};

program.command('init')
  .description('Creates a .env configuration file with the enviroment variables')
  .argument('<host>', 'host address')
  .argument('<user>', 'user')
  .argument('<pass>', 'password')
  .argument('<database>', 'database name')
  .option('-o, --output-file <filename>', 'output filename', '.africa.env')
  .option('-p, --output-path <path>', 'output path', './')
  .action((host, user, pass, db, output_file, output_path) => {
    fs.writeFile(`${output_path}${output_file}`, env_string(host, user, pass, db), () => {
      console.log(green(`${output_file} file created with success!`));
    });
  });

program.command('create-migration')
  .description('Create a migration file for the database')
  .argument('<filename>', 'migration filename', (args) => {
    let date = new Date();
    let filename = (args.search('_table') >= 0) ? `${date.toLocaleDateString().replaceAll('/', '-')}${date.toLocaleTimeString().replaceAll(':', '-').split(' PM')[0]}` : ;
    return 
  });

program.parse();