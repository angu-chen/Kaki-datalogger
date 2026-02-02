## Project Overview

This is a full-stack TypeScript project that serves as a boilerplate for creating web applications. It uses React for the frontend, Express for the backend, and SQLite for the database. The project is set up with Vite for frontend tooling, and Knex for database migrations and seeding. It also includes a basic API for fetching a list of fruits.

The project is structured with a `client` directory for the frontend code and a `server` directory for the backend code. The `models` directory contains the data structures shared between the client and server.

## Building and Running

To get the project up and running, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development servers:**
    ```bash
    npm run dev
    ```
    This will start the frontend and backend servers in parallel. The client will be available at `http://localhost:5173` and the server at `http://localhost:3000`.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready client and server files.

4.  **Start the production server:**
    ```bash
    npm start
    ```

## Testing

The project uses `vitest` for testing. To run the tests, use the following command:

```bash
npm test
```

## Development Conventions

*   **Linting:** The project uses ESLint for code linting. To check for linting errors, run:
    ```bash
    npm run lint
    ```
*   **Database Migrations:** The project uses Knex for database migrations. To create a new migration, run:
    ```bash
    npm run knex migrate:make <migration_name>
    ```
    To run the migrations, use:
    ```bash
    npm run knex migrate:latest
    ```
*   **Database Seeding:** The project uses Knex for database seeding. To create a new seed file, run:
    ```bash
    npm run knex seed:make <seed_name>
    ```
    To run the seeds, use:
    ```bash
    npm run knex seed:run
    ```

## PromptKit Quick Reference
- Review the available artefacts when the student requests them:
  - Protocol: `promptkit/protocols/setup.md` — instructions for updating these CLI briefings.
  - Workflow: `promptkit/workflows/tutor.md` — guide for tutoring/explanation sessions.
  - Workflow: `promptkit/workflows/reflect.md` — guide for documenting outcomes and next steps.
- Student notes live in `promptkit/notes/`; The table in `progress-journal.md` is main place to update with reflections. Instructor Activities are in `promptkit/activities/` (read-only).
- When new workflows arrive, expect additional files under `promptkit/workflows/`.