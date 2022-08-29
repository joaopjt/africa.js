#!/usr/bin/env node
/**
 * Copyright (c) África.js
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const dotenv = require('dotenv');
dotenv.config();

const moment = require('moment');
const fs = require('fs');
const { green } = require('colorette');
const { program } = require('commander');
const { version } = require('../package.json');

const { MySQL, MariaDB, PostgreSQL, SQLServer, SQLite } = require('../dist/index.min.js');

program
  .name('África.js CLI')
  .description('The África.js ORM Command Line Interface.')
  .version(version);

let db = undefined;
let env_string = (client, host, user, pass, db) => {
  return `AFRICA_MIGRATIONS="migrations/"\nAFRICA_SEEDS="seeds/"\n\nDB_CLIENT="${client}"\nDB_HOST="${host}"\nDB_USER="${user}"\nDB_PASS="${pass}"\nDB_DATABASE="${db}"`;
};

if (process.env['DB_CLIENT']) {
  switch(process.env['DB_CLIENT']) {
    case 'MySQL':
    case 'mysql':
      db = new MySQL(process.env['DB_HOST'], process.env['DB_USER'], process.env['DB_PASS'], process.env['DB_DATABASE']);
      break;

    case 'MariaDB':
    case 'mariadb':
      db = new MariaDB(process.env['DB_HOST'], process.env['DB_USER'], process.env['DB_PASS'], process.env['DB_DATABASE']);
      break;

    case 'PostgreSQL':
    case 'postgresql':
      db = new PostgreSQL(process.env['DB_HOST'], process.env['DB_USER'], process.env['DB_PASS'], process.env['DB_DATABASE']);
      break;

    case 'SQLite':
    case 'sqlite':
      db = new SQLite(process.env['DB_DATABASE']);
      break;

    case 'SQLServer':
    case 'sqlserver':
      db = new SQLServer(process.env['DB_HOST'], process.env['DB_USER'], process.env['DB_PASS'], process.env['DB_DATABASE']);
      break;

    default:
      db = new MySQL(process.env['DB_HOST'], process.env['DB_USER'], process.env['DB_PASS'], process.env['DB_DATABASE']);
      break;
  };
}

program.command('init <database_client> <host> <user> <pass> <database_name>')
  .description('Creates/read the .env configuration file')
  .action((client, host, user, pass, db) => {
    fs.readFile(process.cwd() + '/.env', 'utf8', (err, file) => {
      if (err) {
        let env = env_string(client, host, user, pass, db);

        fs.writeFile(process.cwd() + `/.env`, env, {
          encoding: "utf8",
          flag: "w"
        }, (err) => {
          if (!err) console.log(green(`.env file created with success!`));
        });

        fs.mkdirSync(process.cwd() + '/migrations');
        fs.mkdirSync(process.cwd() + '/seeds');
      }
    });
  });

program.command('create-migration')
  .description('Create a migration file for the database')
  .argument('<filename>', 'migration filename', (nameargm) => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa create-migration`.');
    } else {
      let date = moment().format('YYYYMMDD_HH-mm-ss');

      let filename = `${date}_${nameargm}`;

      if (!db.select().from('_africa_migrations')) {
        db.create('_africa_migrations', {
          'id': Africa.int().primary_key().not_null(),
          'name': Africa.varchar()
        });
      }

      fs.copyFile('./files/migration.js', process.cwd() + process.env['AFRICA_MIGRATIONS'] + filename, fs.constants.COPYFILE_EXCL, () => {
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
      let date = moment().format('YYYYMMDD_HH-mm-ss');

      let filename = `${date}_${nameargm}`;

      if (!db.select().from('_africa_seeders')) {
        db.create('_africa_seeders', {
          'id': Africa.int().primary_key().not_null(),
          'name': Africa.varchar()
        });
      }
      
      fs.copyFile('./files/seeder.js', process.cwd() + process.env['AFRICA_SEEDS'] + filename, fs.constants.COPYFILE_EXCL, () => {
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
        files.forEach(file => {
          if (migrated_files.find(f => f.name != file)) {
            let migration = require(process.cwd() + process.env['AFRICA_MIGRATIONS'] + file);

            migration.up(db);

            db.insert('_africa_migrations', { name: file });
          }
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
      let migrated_seeds = db.select('name').from('_africa_seeders');

      fs.readdir(process.env['AFRICA_SEEDS'], (err, files) => {
        files.forEach(file => {
          if (migrated_seeds.find(s => s.name != file)) {
            let { table, seed } = require(process.cwd() + process.env['AFRICA_SEEDS'] + file);

            seed.forEach((s) => { db.insert(table, s); });

            db.insert('_africa_seeders', { name: file });
          }
        });
      });
    }
  });

program.parse();