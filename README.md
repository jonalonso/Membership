# Starlight Pricing Microservice

## Docker Database connexion

##### If don't have a Postgres superuser
 Use the Postgres terminal: 
 - Run `CREATE USER user1 SUPERUSER;`
 - Run `ALTER USER user1 SUPERUSER PASSWORD 'user1';`
## Enviroment setup

1. Do not forget to run `yarn` or `yarn install` to install the required dependencies.
2. Run `docker-compose up -d` in your command shell to spin up local DB and Elasticsearch instances.
3. Run `yarn start`
