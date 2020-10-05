# LibQuality project

An application that collects data from GitHub, consolidate, and make them available through a REST api.

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
