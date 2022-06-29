# :earth_africa: África.js
África is a fulfilled query builder that runs over SQL Server, SQLite, MySQL, MariaDB and PostgreSQL.

## Getting Started

The API follows the SQL syntax, so we get the same API methods for every database client.

Lets start with the connection over a MySQL client as a example:

```javascript
import africa from 'africa.js';
import { MySQL } from 'africa.js';

const mysql = new MySQL('localhost', 'root', 'root', 'password');
```

## Queries Avaiable

Create a new table:
```javascript
  mysql
    .create('table_name', {
      'id': africa.int().null(false).primary_key(),
      'name': africa.varchar(255).null(false), // default value of varchar()
      'age': africa.varchar(255).null(false),
      'email': africa.varchar(255).null(false),
    });
```

Read table from database:
```javascript
  mysql
    .select('collumns')
    .from('table');
```

Read table from database with clausules:
```javascript
  mysql
    .select('collumns')
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
    .select('collumns')
    .from('table')
    .join('table2', {
      foo: 'bar'
    });
```

Read table from database with LEFT JOIN:
```javascript
  mysql
    .select('collumns')
    .from('table')
    .left_join('table2', {
      foo: 'bar'
    });
```

Read table from database with RIGHT JOIN:
```javascript
  mysql
    .select('collumns')
    .from('table')
    .right_join('table2', {
      foo: 'bar'
    });
```

Read table from database with OUTER FULL JOIN:
```javascript
  mysql
    .select('collumns')
    .from('table')
    .outer_join('table2', {
      foo: 'bar'
    });
```

## COPYRIGHT

MIT License.

**Made with :hearts: by John.**
