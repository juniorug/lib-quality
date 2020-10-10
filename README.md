# LibQuality project

An application that collects data from GitHub, consolidate, and make them available through a REST api.

# LibQualityFrontend

The Front-end for this project can be found at [lib-quality](https://github.com/juniorug/lib-quality).

## Development

### Pre-requisites

You'll need a minimal amount of supporting libraries to get started. This includes:

- Docker
- Docker-compose
- NodeJs

### Local Development

To start working with this project, clone the repository and run the following in the project root.

```bash
npm install
npm run dev
```

### Build and run Docker container

To build and run the docker container run the following in the project root.

```bash
docker-compose build
docker-compose up --remove-orphans
```

### Swagger doc

the swagger documentation can be found at
http://localhost:8080/api-docs/#/

## How it works 

On the startup, the application calls some Github API's in parallel to grab some data about known projects. Then, the application consolidates these info and make it available through REST API's. The method to grab/update information from Github can also be called by the ```/start``` endpoint.
