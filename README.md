![GoStack Bootcamp](https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png "GoStack Bootcamp")

# [Challenge 06 - Databases and files upload](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-upload)

In this challenge you must continue to develop the finance application, training what you've learned so far on Node and TypeScript, but this time including database with TypeORM and file upload using Multer.

This will be an application that stores financial transactions that allows managing and listing of these transactions, besides allow report generation from csv files.

## Installing
1. Clone the application

```
$ git clone git@github.com:cleiver/GoStack11-Desafio06-banco-de-dados-e-upload-de-arquivos.git
```

2. Install dependencies

```
$ yarn
```

3. Install database using docker

```
$ docker run --name postgres_desafio06 -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

4. Create databases `gostack_desafio06` and `gostack_desafio06_tests`

5. Run migrations

```
$ yarn typeorm migration:run
```

## Running the tests

Before running the tests, create the table `gostack_desafio06_tests`.

```
yarn test
```
