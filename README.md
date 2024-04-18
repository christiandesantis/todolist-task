# TodoList Task

## Requirements
- Docker

## Setup

1. Copy the appropriate environment file:
  - For development in macOS/Linux: `cp .env.development .env`
  - For production in macOS/Linux: `cp .env.production .env`

2. Adjust the environment variables in the `.env` file as needed.

3. Bootstrap the containers using Docker Compose:
  ```
  docker-compose up -d
  ```

4. Once the containers are up, you need to set up the database. To do this, run the following commands inside the backend container:

  ```
  npm run migration:generate
  npm run migration:run
  ```

## Accessing the Next.js App

After running the Docker Compose command and setting up the database, the Next.js app will be accessible at `localhost:9000` (in case of the development environment) if the environment variables were left as they were.