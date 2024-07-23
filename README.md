# ShiftRx Challenge with PostgreSQL, Node.js, and Next.js

## Getting Started:

1. **Prerequisites:**
   - Docker and Docker Compose installed on your system.

2. **Configuration:**
    * **Important:**
       - The `.env` files in the `api` and `root` directories are provided for convenience during development. They are **not** intended for production use. For security, environment variables should be managed through Docker secrets or other secure mechanisms in a production environment.

    * **Database Setup (Optional):**
        - If you need to customize the PostgreSQL database configuration, you can modify the `environment` section under the `db` service in the `docker-compose.yml` file.

3. **Running the Project:**
   - Open a terminal and navigate to the project's root directory.
   - Run `docker-compose up -d`. This will build the images, start the containers, and run the services in the background.

4. **Accessing the Services:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:4200`
   - PostgreSQL (if needed): `localhost:5432`

## Project Structure:

- `api`: Backend API built with Node.js and Express.
- `prisma`: Prisma configuration and seed files.
- `frontend`: Frontend built with Next.js.
- `docker-compose.yml`: Docker Compose configuration for managing services.
- `.env`: Development environment variables (**DO NOT USE IN PRODUCTION**)

## Database Seeding:

Database seeding is the process of populating your database with an initial set of data. This is useful for development and testing purposes.

### How to Run Seeds:

1. **Ensure your Docker containers are running:** `docker-compose up -d`
2. **Execute the seed command:** `docker-compose exec api npx prisma db seed`

This command does the following:

- `docker-compose exec api`: Executes a command (`npx prisma db seed`) within the `api` container.
- `npx prisma db seed`:  Runs Prisma's built-in seed functionality, which will look for a `seed.ts` file in your `api/prisma` directory and execute the seed logic defined there.

## Development Notes:

- **Hot Reloading:** Changes to the `api` and `frontend` code will automatically trigger a rebuild and restart of the respective containers.
- **Volumes:** Docker volumes are used to persist the database data (`db-data`) and to sync code changes from your local directories to the containers. 
- **Healthcheck:** The database service has a healthcheck to ensure it's ready before the API starts.
