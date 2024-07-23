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
- `frontend`: Frontend built with Next.js.
- `docker-compose.yml`: Docker Compose configuration for managing services.
- `.env`: Development environment variables (**DO NOT USE IN PRODUCTION**)

## Development Notes:

- **Hot Reloading:** Changes to the `api` and `frontend` code will automatically trigger a rebuild and restart of the respective containers.
- **Volumes:** Docker volumes are used to persist the database data (`db-data`) and to sync code changes from your local directories to the containers. 
- **Healthcheck:** The database service has a healthcheck to ensure it's ready before the API starts.

## Security Considerations:

- **.env Files:** As mentioned, never commit `.env` files to version control. They can expose sensitive information like API keys, database credentials, and more.
- **Production Deployment:** When deploying to production, use Docker secrets, environment variables injected via your deployment platform, or a secure vault to manage your application's sensitive configuration.
