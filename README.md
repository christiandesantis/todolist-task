# TodoList Task

## Requirements
- Docker

## Setup

1. Copy the appropriate environment file:
  - For macOS: `cp .env.development .env`
  - For Linux: `cp .env.production .env`

2. Adjust the environment variables in the `.env` file as needed.

3. Bootstrap the containers using Docker Compose:
  ```
  docker-compose up -d
  ```

## Accessing the Next.js App

After running the Docker Compose command, the Next.js app will be accessible at `localhost:9000` (in case of the development environment) if the environment variables were left as they were.
