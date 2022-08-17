require('dotenv').config();

const moment = require('moment');
const { fs } = require('node:fs');
const { green } = require('colorette');
const { program } = require('commander');
const { version } = require('../package.json');

program
  .name('África.js CLI')
  .description('The África.js ORM Command Line Interface.')
  .version(version);

const env_string = (host, user, pass, db) => {
  return `DB_CLIENT: ${client}\nDB_HOST: ${host}\nDB_USER: ${user}\nDB_PASS: ${pass}\nDB_DATABASE: ${database}`;
};

program.command('init <database_client> <host> <user> <pass> <database_name>')
  .description('Creates/read the .env configuration file')
  .action((client, host, user, pass, db) => {
    fs.readFile('.env', 'utf8', err => {
      if (err) {
        fs.writeFile(`.env`, env_string(host, user, pass, db), () => {
          console.log(green(`.env file created with success!`));
        });
      }
    });
  });

program.command('create-migration')
  .description('Create a migration file for the database')
  .argument('<filename>', 'migration filename', (args) => {
    let date = new Date();
    date = `${date.toLocaleDateString().replaceAll('/', '')}_${date.toTimeString().replaceAll(':', '-').split(' ')[0]}`;

    let filename = `${date}_${args}`;

    fs.writeFile(`./${filename}`, env_string(host, user, pass, db), () => {
      console.log(green(`'${filename}' file created with success!`));
    });
  });

program.command('create-seed')
  .description('Create a seeder file for the database')
  .argument('<filename>', 'seeder file filename', (args) => {
    let date = new Date();
    date = `${date.toLocaleDateString().replaceAll('/', '')}_${date.toTimeString().replaceAll(':', '-').split(' ')[0]}`;

    let filename = `${date}_${args}`;

    fs.writeFile(`./${filename}`, env_string(host, user, pass, db), () => {
      console.log(green(`'${filename}' file created with success!`));
    });
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