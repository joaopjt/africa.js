# :earth_africa: África.js
África is a fulfilled query builder that runs over SQL Server, SQLite, MySQL, MariaDB and PostgreSQL.

## CLI

To install the CLI, you need to run on your bash:
```bash
  npm install -g africa.js
```

### Init

The ```init``` command, starts the CLI creating a ***.env*** file and the folders for migrations and seeds. You can change it after the .env file is created.

```bash
$ africa init <database_client> <host> <user> <password> <database_name>
```

### Create Migration

To create a migration, you need to run:

```bash
$ africa create-migration example_migration
'20010911_084600-example_migration' migration file created with success!
```

### Create Seeder

To create a seeder, you can run:

```bash
$ africa create-seeder example_seed
'20010911_100101-example_seed' seed file created with success!
```

### Migrate

To run the migrations in the folder, you need to run:
```bash
$ africa migrate
```

### Seed

To run the seeders in the folder, you need to run:
```bash
$ africa seed
```

### Rollback

To rollback the migrations (in the database), you can run:
```bash
$ africa rollback
```

## The API

The API follows the SQL syntax, so we get the same API methods for every database client.

Lets start with the connection over a MySQL client as a example:

```javascript
import { Africa, MySQL } from 'africa.js';

const mysql = new MySQL('localhost', 'root', 'root', 'password');
```

## Queries Avaiable

Create a new table:
```javascript
  mysql
    .create('table_name', {
      'id': africa.int().null(false).primary_key().auto_increment(),
      'name': africa.varchar(255).null(false), // default value of varchar()
      'age': africa.varchar(255).null(false),
      'email': africa.varchar(255).null(false),
    });
```

Read table from database:
```javascript
  mysql
    .select('id, name')
    .from('table');
```

Read table from database with clausules:
```javascript
  mysql
    .select('id, name')
    .from('table')
    .where('collumn', 'operator', 'value');
```

Insert in table:
```javascript
  mysql
    .insert('table', [
      ['John', 21, 'john@doe.com'],
      ['Mary', 21, 'mary@example.com'] 
    ]);
```

Read table from database with INNER JOIN:
```javascript
  mysql
    .select('id, name')
    .from('table')
    .join('table2', {
      foo: 'bar'
    });
```

Read table from database with LEFT JOIN:
```javascript
  mysql
    .select('id, name')
    .from('table')
    .left_join('table2', {
      foo: 'bar'
    });
```

Read table from database with RIGHT JOIN:
```javascript
  mysql
    .select('id, name')
    .from('table')
    .right_join('table2', {
      foo: 'bar'
    });
```

Read table from database with OUTER FULL JOIN:
```javascript
  mysql
    .select('id, name')
    .from('table')
    .outer_join('table2', {
      foo: 'bar'
    });
```

RAW SQL:
```javascript
  mysql
    .raw('SELECT * FROM table_name');
```

## COPYRIGHT

MIT License.

**Made with :hearts: by John.**
