# Technical Decisions

## 1. Frontend Framework

### Decision
React with Vite and TypeScript.

### Why
The application is primarily an authenticated client management dashboard, so a React SPA is sufficient for the requirements. Vite provides a lightweight and fast development setup, while TypeScript improves type safety and maintainability.

### Alternative Considered
Next.js

### Why Not
The assessment does not require server-side rendering, SEO, or other Next.js-specific features. React with Vite keeps the application simpler and focused on the dashboard requirements.


## 2. Backend

### Decision
Node.js with Express.js.

### Why
Express is well suited for building REST APIs and fits naturally with the MERN stack. It also allows us to keep the backend structure modular with separate routes, controllers, middleware, services, and models.


## 3. Database

### Decision
MongoDB with Mongoose.

### Why
The project contains users, clients, and projects with straightforward relationships. MongoDB provides flexibility while Mongoose gives us schemas, validation, relationships, and a structured way to work with the database.


## 4. Authentication

### Decision
JWT-based authentication using HttpOnly cookies.

### Why
HttpOnly cookies prevent JavaScript running in the browser from directly accessing the authentication token. This provides a safer approach than storing authentication tokens in localStorage.

### Alternative Considered
localStorage-based JWT authentication.

### Why Not
Tokens stored in localStorage are accessible to JavaScript and can be exposed if the application has an XSS vulnerability.


## 5. UI Framework

### Decision
Material UI (MUI).

### Why
MUI provides a consistent component system and responsive utilities, allowing us to build a clean professional dashboard efficiently while still maintaining control over the application's theme and design.


### Decision: Used Zod for Client input validation.

### Why:
Frontend validation improves UX, but backend validation is mandatory for security and data integrity, so
backend will validate request body independently.

Why one schema for create/update:
Client's required fields are same, so instead of unnecessary duplicate schemas we will use reusable schema

### Decision: 200 vs 204 on DELETE Method
DELETE requests return 200 OK with a confirmation payload rather than 204 No Content, allowing the API to maintain a consistent response structure and provide confirmation details about the deleted resource.