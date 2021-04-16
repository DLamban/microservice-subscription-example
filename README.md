# Simple Microservice Subscription Service:

## To start the application use: 
```
$ docker-compose up -d
```
The compose file defines an application with 4 micro-services `api-gateway`, `subscription-microservice`, `email-microservice` and `db`.

`api-gateway` is the public entry point for the rest of the api.
## Port mapping
```
api-gateway:4001
subscription-microservice:4002
email-microservice:4002
```
## Authentication
To access the microservices through the `api-gateway` is required authorization based in JWT.

Access token is served from two endpoints `http://localhost:4000/api/getAdminToken` and `http://localhost:4000/api/getUserToken`.

Use the returned token as a Bearer token in further requests

### The api gateway endpoints could be check in the swagger page: [http://localhost:4000/api-docs/]() 
Swagger it's not fully configured and it can't handle authorization

Api gateway has some simple business test that can be run with 
```$ npm  test```

Project structure:
```
.
├── api-gateway
│   ├── Dockerfile
├── subscription-microservice
│   ├── Dockerfile
├── email-microservice
│   ├── Dockerfile
├── commands
│   └── init.sql
├── secrets
│   └── dbpassword.txt
│   └── jwttoken.txt
├── docker-compose.yaml
└── README.md
```
