# Architecture

## Backend Startup Flow

The backend separates application configuration from server startup.

- `app.ts` is responsible for configuring the Express application, middleware, and routes.
- `server.ts` is responsible for starting the application and establishing the required infrastructure connections.
- Database connectivity is kept in a dedicated configuration module.

This separation keeps the application modular and makes the backend easier to test and maintain.