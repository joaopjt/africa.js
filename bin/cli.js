require('dotenv').config();
const moment = require('moment');
const { fs } = require('node:fs');
const { green } = require('colorette');
const { program } = require('commander');
const { version } = require('../package.json');

program
  .name('África.js CLI')
  .description('The África.js Command Line Interface.')
  .version(version);

const env_string = (host, user, pass, db) => {
  return `DB_HOST: ${host}\nDB_USER: ${user}\nDB_PASS: ${pass}\nDB_DATABASE: ${database}`;
};

program.command('init')
  .description('Creates a .env configuration file with the enviroment variables')
  .argument('<client>', 'database client')
  .argument('<host>', 'host address')
  .argument('<user>', 'user')
  .argument('<pass>', 'password')
  .argument('<database>', 'database name')
  .option('-o, --output-file <filename>', 'output filename', '.env')
  .action((host, user, pass, db, output_file) => {
    fs.writeFile(`./${output_file}`, env_string(host, user, pass, db), () => {
      console.log(green(`${output_file} file created with success!`));
    });
  });

program.command('create-migration')
  .description('Create a migration file for the database')
  .argument('<filename>', 'migration filename', (args) => {
    let date = new Date();
    date = `${date.toLocaleDateString().replaceAll('/', '')}_${date.toTimeString().replaceAll(':', '-').split(' ')[0]}`;

    let filename = `${date}_${args}`;

    
  });

program.command('create-seed')
  .description('Create a seeder file for the database')
  .argument('<filename>', 'seeder file filename', (args) => {
    let date = new Date();
    date = `${date.toLocaleDateString().replaceAll('/', '')}_${date.toTimeString().replaceAll(':', '-').split(' ')[0]}`;

    let filename = `${date}_${args}`;

    
  });

program.command('migrate')
  .description ('Migrate all migrations files to the database')
  .action(() => {
    // run migrations
  });

program.command('seed')
  .description ('Seed seeder files to the database')
  .action(() => {
    // run seeders
  });

program.parse();