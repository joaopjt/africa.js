#!/usr/bin/env node
/**
 * Copyright (c) África.js
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const dotenv = require('dotenv');
dotenv.config();

const moment = require('moment');
const fs = require('fs');
const { green } = require('colorette');
const { program } = require('commander');
const { version } = require('../package.json');

const { Africa, MySQL, MariaDB, PostgreSQL, SQLServer, SQLite } = require('../dist/index.min.js');

program
  .name('África.js')
  .description('The África.js ORM Command Line Interface.')
  .version(version);

let db = null;
let env_string = (client, host, user, pass, db) => {
  return `AFRICA_MIGRATIONS="migrations/"\nAFRICA_SEEDS="seeds/"\n\nDB_CLIENT="${client}"\nDB_HOST="${host}"\nDB_USER="${user}"\nDB_PASS="${pass}"\nDB_NAME="${db}"`;
};

let db_connect = function(db_client, host, user, pass ,db_name) {
  switch(db_client) {
    case 'MySQL':
    case 'mysql':
      return new MySQL(host, user, pass, db_name);
      break;

    case 'MariaDB':
    case 'mariadb':
      return new MariaDB(host, user, pass, db_name);
      break;

    case 'PostgreSQL':
    case 'postgresql':
      return new PostgreSQL(host, user, pass, db_name);
      break;

    case 'SQLite':
    case 'sqlite':
      return new SQLite(db_name);
      break;

    case 'SQLServer':
    case 'sqlserver':
      return new SQLServer(host, user, pass, db_name);
      break;

    default:
      return new MySQL(host, user, pass, db_name);
      break;
  };
};

if (process.env['AFRICA_MIGRATIONS']) {
  if (process.env['DB_CLIENT'] && process.env['DB_HOST'] && process.env['DB_USER'] && process.env['DB_PASS'] && process.env['DB_NAME']) {
    db = db_connect(process.env['DB_CLIENT'], process.env['DB_HOST'], process.env['DB_USER'], process.env['DB_PASS'], process.env['DB_NAME']);
  } else {
    if (!process.env['DB_CLIENT']) console.error(`The .env file key 'DB_CLIENT' is not defined.`);
    if (!process.env['DB_HOST']) console.error(`The .env file key 'DB_HOST' is not defined.`);
    if (!process.env['DB_USER']) console.error(`The .env file key 'DB_USER' is not defined.`);
    if (!process.env['DB_PASS']) console.error(`The .env file key 'DB_PASS' is not defined.`);
    if (!process.env['DB_NAME']) console.error(`The .env file key 'DB_NAME' is not defined.`);
  }
}

program.command('init [database_client] [host] [user] [pass] [database_name]')
  .description('Creates or Read the .env configuration file and setups the ORM')
  .action((client, host, user, pass, db_name) => {
    fs.readFile(process.cwd() + '/.env', 'utf8', (err, file) => {
      if (err) {
        let data = env_string(client, host, user, pass, db_name);

        fs.writeFile(process.cwd() + `/.env`, data, {
          encoding: "utf8",
          flag: "w"
        }, (err) => {
          if (!err) { console.log(green(`.env file created with success!`)); } else { console.error(err); };
        });

        fs.mkdirSync(process.cwd() + '/migrations');
        fs.mkdirSync(process.cwd() + '/seeds');

        let db = db_connect(client, host, user, pass, db_name);

        db.create('_africa_seeders', {
          'id': new Africa().int().auto_increment().primary_key().value,
          'name': new Africa().varchar().value
        });

        db.create('_africa_migrations', {
          'id': new Africa().int().auto_increment().primary_key().value,
          'name': new Africa().varchar().value
        });

        console.log(green('Africa.js ORM initialized with success!'));
      } else {
        fs.mkdirSync(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS']);
        fs.mkdirSync(process.cwd() + '/' + process.env['AFRICA_SEEDS']);

        let db = db_connect(client, host, user, pass, db_name);

        db.create('_africa_seeders', {
          'id': new Africa().int().auto_increment().primary_key().value,
          'name': new Africa().varchar().value
        });

        db.create('_africa_migrations', {
          'id': new Africa().int().auto_increment().primary_key().value,
          'name': new Africa().varchar().value
        });

        console.log(green('Africa.js ORM initialized with success!'));
      }
    });
  });

program.command('create-migration')
  .description('Create a migration file for the database')
  .argument('<filename>', 'migration filename')
  .action((filename) => {
    if (!process.env['DB_CLIENT']) {
      console.error('You need to init the ORM or create the .env file before try to run `africa create-migration`.');
    } else {
      let date = moment().format('YYYYMMDD_HHmmss');

      filename = `${date}-${filename}.js`;

      fs.copyFile(__dirname + '/files/migration.js', process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'] + '/' + filename, fs.constants.COPYFILE_EXCL, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(green(`'${filename}' migration file created with success!`));
        }
      });
    }
  });

program.command('create-seed')
  .description('Create a seeder file for the database')
  .argument('<filename>', 'seeder filename')
  .action((filename) => {
    if (!process.env['DB_CLIENT']) {
      console.error('You need to init the ORM or create the .env file before try to run `africa create-seed`.');
    } else {
      let date = moment().format('YYYYMMDD_HHmmss');

      filename = `${date}-${filename}.js`;

      fs.copyFile(__dirname + '/files/seeder.js', process.cwd() + '/' + process.env['AFRICA_SEEDS'] + '/' + filename, fs.constants.COPYFILE_EXCL, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(green(`'${filename}' seed file created with success!`));
        }
      });
    }
  });

program.command('migrate')
  .description ('Migrate all migrations files to the database')
  .action(async () => {
    if (!process.env['DB_CLIENT']) {
      console.error('You need to init the ORM or create the .env file before try to run `africa migrate`.');
    } else {
      let migrated_files = await db.select('name').from('_africa_migrations').query();

      fs.readdir(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'], (err, files) => {
        files.forEach(file => {
          if (migrated_files === null || !migrated_files.find(f => f.name === file)) {
            let migration = require(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'] + '/' + file);

            migration.up(db, Africa);

            db.insert('_africa_migrations', { name: file }).query();

            console.log(green(`'${file}' migrated with success!`));
          }
        });

        console.log(green('All migrations files readed with success!'));
      });
    }
  });

program.command('seed')
  .description ('Seed seeder files to the database')
  .action(async () => {
    if (!process.env['DB_CLIENT']) {
      console.error('You need to init the ORM or create the .env file before try to run `africa seed`.');
    } else {
      let migrated_seeds = await db.select('name').from('_africa_seeders').query();

      fs.readdir(process.cwd() + '/' + process.env['AFRICA_SEEDS'], (err, files) => {
        files.forEach(file => {
          if (migrated_seeds === null || !migrated_seeds.find(s => s.name === file)) {
            let { table, seed } = require(process.cwd() + '/' + process.env['AFRICA_SEEDS'] + '/' + file);

            seed.forEach((s) => { 
              db.insert(table, s).query();
            });

            db.insert('_africa_seeders', { name: file }).query();

            console.log(green(`'${file}' seeded with success!`));
          }
        });

        console.log(green('All seeders finished with success!'));
      });
    }
  });

program.command('rollback')
  .description ('Rollback all migrations files in the database')
  .action(async () => {
    if (!process.env['DB_CLIENT']) {
      console.error('You need to init the ORM or create the .env file before try to run `africa rollback`.');
    } else {
      let migrated_files = await db.select('name').from('_africa_migrations').order_by('id').desc();

      fs.readdir(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'], (err, files) => {
        files.forEach(file => {
          let migration = require(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'] + '/' + file);

          migration.down(db, Africa);

          db.delete().from('_africa_migrations').where({ name: file }).query();

          console.log(green(`Rollbacked '${file}'.`));
        });
      });

      console.log(green(`Rollback task finished with success.`));
    }
  });

program.parse();