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

let db = undefined;
const env_string = (client, host, user, pass, db) => {
  return `AFRICA_MIGRATIONS: migrations\nAFRICA_SEEDS: seeds\n\nDB_CLIENT: ${client}\nDB_HOST: ${host}\nDB_USER: ${user}\nDB_PASS: ${pass}\nDB_DATABASE: ${database}`;
};

if (process.env['DB_CLIENT']) {
  switch(process.env['DB_CLIENT']) {
    case 'MySQL':
    case 'mysql':
      db = new MySQL(...dbConfig);
      break;

    case 'MariaDB':
    case 'mariadb':
      db = new MariaDB(...dbConfig);
      break;

    case 'PostgreSQL':
    case 'postgresql':
      db = new PostgreSQL(...dbConfig);
      break;

    case 'SQLite':
    case 'sqlite':
      db = new SQLite(dbConfig.database);
      break;

    case 'SQLServer':
    case 'sqlserver':
      db = new SQLServer(...dbConfig);
      break;

    default:
      db = new MySQL(...dbConfig);
      break;
  };
}

program.command('init <database_client> <host> <user> <pass> <database_name>')
  .description('Creates/read the .env configuration file')
  .action((client, host, user, pass, db) => {
    fs.readFile('.env', 'utf8', err => {
      if (err) {
        fs.writeFile(`.env`, env_string(client, host, user, pass, db), () => {
          console.log(green(`.env file created with success!`));
        });
        fs.write(process.env['AFRICA_MIGRATIONS']);
        fs.write(process.env['AFRICA_SEEDS']);
      }
    });
  });

program.command('create-migration')
  .description('Create a migration file for the database')
  .argument('<filename>', 'migration filename', (nameargm) => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa create-migration`.');
    } else {
      let date = new Date();
      date = `${date.toLocaleDateString().replaceAll('/', '')}_${date.toTimeString().replaceAll(':', '-').split(' ')[0]}`;

      let filename = `${date}_${nameargm}`;

      fs.copy('./files/migration.js', process.cwd() + process.env['AFRICA_MIGRATIONS'] + `./${filename}`, fs.constants.COPYFILE_EXCL, () => {
        console.log(green(`'${filename}' migration file created with success!`));
      });
    }
  });

program.command('create-seed')
  .description('Create a seeder file for the database')
  .argument('<filename>', 'seeder file filename', (nameargm) => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa create-seed`.');
    } else {
      let date = new Date();
      date = `${date.toLocaleDateString().replaceAll('/', '')}_${date.toTimeString().replaceAll(':', '-').split(' ')[0]}`;

      let filename = `${date}_${nameargm}`;

      fs.copy('./files/seeder.js', process.cwd() + process.env['AFRICA_SEEDS'] + `./${filename}`, fs.constants.COPYFILE_EXCL, () => {
        console.log(green(`'${filename}' seed file created with success!`));
      });
    }
  });

program.command('migrate')
  .description ('Migrate all migrations files to the database')
  .action(() => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa migrate`.');
    } else {
      let migrated_files = db.select('name').from('_africa_migrations');

      fs.readdir(process.env['AFRICA_MIGRATIONS'], (err, files) => {
        files.map(f => migrated_files[f.name] = undefined).forEach(file => {
          let migration = require(`${process.env['AFRICA_MIGRATIONS']}${file.name}`);
        });
      });
    }
  });

program.command('seed')
  .description ('Seed seeder files to the database')
  .action(() => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa seed`.');
    } else {
      fs.readdir(process.env['AFRICA_SEEDS'], (err, files) => {
        files.forEach(file => {

        });
      });
    }
  });

program.parse();