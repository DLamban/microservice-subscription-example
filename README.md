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
To access the microservices through the `api-gateway` is required authorization based in JWT.

### The api gateway endpoints could be check in the swagger page: [http://localhost:4000/api-docs/]()

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
│   └── password.txt
│   └── jwttoken.txt
├── docker-compose.yaml
└── README.md
```
