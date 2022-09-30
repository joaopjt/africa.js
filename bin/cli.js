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

const { Africa, MySQL, MariaDB, PostgreSQL, SQLServer, SQLite } = require('../dist/index.min.js');

program
  .name('África.js')
  .description('The África.js ORM Command Line Interface.')
  .version(version);

let db = undefined;
let env_string = (client, host, user, pass, db) => {
  return `AFRICA_MIGRATIONS="migrations/"\nAFRICA_SEEDS="seeds/"\n\nDB_CLIENT="${client}"\nDB_HOST="${host}"\nDB_USER="${user}"\nDB_PASS="${pass}"\nDB_DATABASE="${db}"`;
};

let db_connect = function(db_client, host, user, pass ,db_name) {
  switch(db_client) {
    case 'MySQL':
    case 'mysql':
      db = new MySQL(host, user, pass, db_name);
      break;

    case 'MariaDB':
    case 'mariadb':
      db = new MariaDB(host, user, pass, db_name);
      break;

    case 'PostgreSQL':
    case 'postgresql':
      db = new PostgreSQL(host, user, pass, db_name);
      break;

    case 'SQLite':
    case 'sqlite':
      db = new SQLite(db_name);
      break;

    case 'SQLServer':
    case 'sqlserver':
      db = new SQLServer(host, user, pass, db_name);
      break;

    default:
      db = new MySQL(host, user, pass, db_name);
      break;
  };
};

if (process.env['DB_CLIENT']) {
  db_connect(process.env['DB_CLIENT'], process.env['DB_HOST'], process.env['DB_USER'], process.env['DB_PASS'], process.env['DB_DATABASE']);
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

        db_connect(client, host, user, pass, db_name);

        db.create('_africa_seeders', {
          'id': Africa.int().auto_increment().primary_key(),
          'name': Africa.varchar()
        });

        db.create('_africa_migrations', {
          'id': Africa.int().auto_increment().primary_key(),
          'name': Africa.varchar()
        });

        console.log(green('Africa.js ORM initialized with success!'));
      } else {
        fs.mkdirSync(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS']);
        fs.mkdirSync(process.cwd() + '/' + process.env['AFRICA_SEEDS']);

        db.create('_africa_seeders', {
          'id': Africa.int().auto_increment().primary_key(),
          'name': Africa.varchar()
        });

        db.create('_africa_migrations', {
          'id': Africa.int().auto_increment().primary_key(),
          'name': Africa.varchar()
        });

        console.log(green('Africa.js ORM initialized with success!'));
      }
    });
  });

program.command('create-migration')
  .description('Create a migration file for the database')
  .argument('<filename>', 'migration filename')
  .action((filename) => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa create-migration`.');
    } else {
      let date = moment().format('YYYYMMDD_HHmmss');

      filename = `${date}-${filename}.js`;

      if (!db.select().from('_africa_migrations')) {
        db.create('_africa_migrations', {
          'id': Africa.int().primary_key().not_null(),
          'name': Africa.varchar()
        });
      }

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
    if (!db) {
      console.error('You need to init the ORM before of running `africa create-seed`.');
    } else {
      let date = moment().format('YYYYMMDD_HHmmss');

      filename = `${date}-${filename}.js`;

      if (!db.select().from('_africa_seeders')) {
        db.create('_africa_seeders', {
          'id': Africa.int().primary_key().not_null(),
          'name': Africa.varchar()
        });
      }

      fs.copyFile(__dirname + '/files/seeder.js', process.cwd() + '/' + process.env['AFRICA_SEEDS'] + '/' + filename, fs.constants.COPYFILE_EXCL, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(green(`'${filename}' seed file created with success!`));
        }
      });
    }
  });

program.command('rollback')
  .description ('Rollback all migrations files in the database')
  .action(() => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa rollback`.');
    } else {
      let migrated_files = db.select('name').from('_africa_migrations').order_by('id').desc();

      fs.readdir(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'], (err, files) => {
        files.forEach(file => {
          let migration = require(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'] + '/' + file);

          migration.down(db, Africa);

          db.delete().from('_africa_migrations').where({ name: file });

          console.log(green(`Rollback of '${file}' conclued with success.`));
        });
      });

      console.log(green(`Rollback task finished with success.`));
    }
  });

program.command('migrate')
  .description ('Migrate all migrations files to the database')
  .action(() => {
    if (!db) {
      console.error('You need to init the ORM before of running `africa migrate`.');
    } else {
      let migrated_files = db.select('name').from('_africa_migrations');

      fs.readdir(process.cwd() + '/' + process.env['AFRICA_MIGRATIONS'], (err, files) => {
        files.forEach(file => {
          if (!migrated_files.find(f => f.name === file)) {
            let migration = require(process.cwd() + process.env['AFRICA_MIGRATIONS'] + file);

            migration.up(db, Africa);

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

      fs.readdir(process.cwd() + '/' + process.env['AFRICA_SEEDS'], (err, files) => {
        files.forEach(file => {
          if (!migrated_seeds.find(s => s.name === file)) {
            let { table, seed } = require(process.cwd() + process.env['AFRICA_SEEDS'] + file);

            seed.forEach((s) => { db.insert(table, s); });

            db.insert('_africa_seeders', { name: file });
          }
        });
      });
    }
  });

program.parse();