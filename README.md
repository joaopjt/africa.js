# :earth_africa: África.js
África is a fulfilled ORM and query builder that runs over SQL Server, SQLite, MySQL, MariaDB and PostgreSQL.

## CLI

To install the CLI, you need to run on your bash:
```bash
$ npm install -g africa.js
```

### Init

The ```init``` command, starts the CLI creating a ***.env*** file and the folders for migrations and seeds. You can change it after the .env file is created.

```bash
$ africa init <database_client> <host> <user> <password> <database_name>
```

Or, if you already have a ***.env*** file, you can just run:
```bash
$ africa init
```

### The ```.env``` file

Heres a example of how the ***.env*** file should be like:

```
AFRICA_MIGRATIONS='migrations/'
AFRICA_SEEDS='seeds/'

DB_CLIENT='mysql|mariadb|postgresql|sqlite|sqlserver'
DB_HOST='localhost'
DB_USER='root'
DB_PASS=''
DB_NAME='africa'
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
'20010911_101010-example_seed' seed file created with success!
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
import { Africa, MariaDB, MySQL, PostgreSQL, SQLite, SQLServer } from 'africa.js';

const mysql = new MySQL('host', 'user', 'password', 'database');
const mariadb = new MariaDB('host', 'user', 'password', 'database');
const postgre = new PostgreSQL('host', 'user', 'password', 'database');
const sqlserver = new SQLServer('host', 'user', 'password', 'database');
const sqlite = new SQLite('path/to/database_filename');
```

## The Querie Builder

Gets SQL value of the query:
```javascript
  await mysql
    .create('news', {
      'id': new Africa().int().null(false).primary_key().auto_increment(),
      'name': new Africa().varchar(255).null(false),
      'age': new Africa().varchar(255).null(false),
      'email': new Africa().varchar(255).null(false)
    });
```

## Running queries

Create a new table:
```javascript
  await mysql
    .create('news', {
      'id': new Africa().int().null(false).primary_key().auto_increment(),
      'name': new Africa().varchar(255).null(false),
      'age': new Africa().varchar(255).null(false),
      'email': new Africa().varchar(255).null(false)
    });
```

Read table from database:
```javascript
  await mysql
    .select() // default brings all records
    .from('news');
```

Insert into table:
```javascript
  await mysql
    .insert('news',
      {
        name: 'John Doe',
        age: 21,
        email: 'john@doe.com'
      }
    );
```

Update record in a table:
```javascript
  await mysql
    .update('news', {
      name: 'Jane Doe'
    })
    .where('name', '=', 'John Doe')
    .where('email', '=', 'john@doe.com');
```

Delete in table:
```javascript
  await mysql
    .delete('news')
    .cascade();
```

Read table from database with clausules:
```javascript
  await mysql
    .select('id, name')
    .from('news')
    .where('collumn', 'operator', 'value');
```

Read table from database with order by clausules:
```javascript
  await mysql
    .select('id, name')
    .from('news')
    .where('collumn', 'operator', 'value')
    .order_by('collumn')
    .desc();
```

Read table from database with INNER JOIN:
```javascript
  await mysql
    .select('id, name')
    .from('news')
    .join('authors', {
      author_name: 'author'
    }); // { id: 1, title: 'example', author: 'Author Name' }
```

Read table from database with LEFT JOIN:
```javascript
  await mysql
    .select('News.id, News.title, Authors.name')
    .as('id', 'title', 'author')
    .from('news')
    .left_join('authors', {
      'News.author': 'Authors.id'
    }); // { 'id: 1, title: 'example', author: 'Author Name' }
```

Read table from database with RIGHT JOIN:
```javascript
  await mysql
    .select('News.id, News.title, News.content')
    .as('id', 'title', 'content')
    .from('news_categories')
    .right_join('news', {
      'NewsCategories.id': 'News.category_id'
    }); // { 'id: 1, title: 'example', author: 'Author Name' }
```

Read table from database with FULL OUTER JOIN:
```javascript
  await mysql
    .select() // all collumns by default
    .from('table1')
    .outer_join('table2', {
      'table1.collumn': 'table2.collumn'
    });
```

RAW SQL:
```javascript
  await mysql
    .raw('SELECT * FROM news');
```

## COPYRIGHT

MIT License.

**Made with :hearts: by John.**
