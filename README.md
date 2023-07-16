# Product Microservice

Product Microservice

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Node@v16.x.x
PostgreSql@15.x
```
### Installing

A step by step series that will tell you how to get a development env running

```
$ cd server
```

```
$ npm ci
```

### DataBase Migrations

Create Database:
```
$ node_modules/.bin/sequelize db:create --url 'dialect://username:password@host:port/database_name'
```
| keyword       | Example         |Description                        |
| ------------- | --------------- |---------------------------------- |
| dialect       | postgres        |Database we are using              |
| username      | root            |Username for the database          |
| password      | postgres        |Password for the database          |
| host          | localhost/IP    |Host on which database is running  |
| port          | 5432            |Port for the database              |
| database_name | sample_database |Database name for the microservice |

Create Migrations:
```
$ node_modules/.bin/sequelize migration:create --name migration_name
```

Run Migrations:
```
$ node_modules/.bin/sequelize db:migrate --url 'dialect://username:password@host:port/database_name'
```
| keyword       | Example         |Description                                     |
| ------------- | --------------- |----------------------------------------------- |
| dialect       | postgres        |Database we are using                           |
| username      | root            |Username for the database                       |
| password      | postgres        |Password for the database                       |
| host          | localhost/IP    |Host on which database is running               |
| port          | 5432            |Port for the database                           |
| database_name | sample_database |Database name from which migrations will happen |

## Run the Server

```
$ npm run start
```
## Run the test cases

```
$ npm run test
```
