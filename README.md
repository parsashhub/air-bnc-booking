### run the project using docker
```
docker-compose up
```
### run projects separately
```
cd /frontend && npm run dev 
```
for starting the react app, and for express node js webserver:
```
cd /backend && npm run dev
```
and for database integration, you should install mongo-db and add the connection string in a .env file, or you can use an online one:
head over to <a href="https://www.mongodb.com/">link</a> here, sign up, and use the free subscription plan.
maybe I will add db integration using docker too, but not for now.

### .env
the backend .env file should have the below content:
```
APP_ENV=
PORT=3001
JWT_PRIVATE_KEY=aSecretKey
DB_LOCAL="mongodb://localhost/booking"
```

<a href="https://documenter.getpostman.com/view/18846553/2s9YeEcs9z">here</a> is the list of apis' documentation using postman.