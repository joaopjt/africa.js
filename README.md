# :earth_africa: África
África is a fulfilled query builder that runs over SQL Server, SQLite, MySQL and PostgreSQL.

## Getting Started

The API for following the SQL syntax, gets the same API chart for every database client.

Lets start with the connection over a MySQL client:

```javascript
import MySQL from 'mysql';

const mysql = new MySQL('localhost', 'root', 'root', 'joaopjt@github');
```

## Queries Avaiable

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

**Made with love by John.**
