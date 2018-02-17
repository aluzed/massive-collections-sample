## Massive Collections Sample

How to use massive-collections.

Once the project is cloned, install the dependencies :

```
npm i
```

Your database and postgres user should already exist.
Create your `config.js` from `config.sample.js` and set your database informations.

Connect to your postgresql database :

```
./node_modules/.bin/massive-collection-cli connect --h=localhost:5432 --db=test_db --u=root --p=root
```

Then, you can create your user table from a terminal :

```
./node_modules/.bin/massive-collections-cli createTable users "username:varchar(255):unique:notnull" "password:varchar(255):noindex:notnull" "email:varchar(255)" "created:timestampz:noindex:null:now()" "modified:timestampz:noindex:null:now()"
```
