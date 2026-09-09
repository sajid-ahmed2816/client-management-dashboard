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

## 6. File Storage

### Decision

Use Cloudinary for external file storage and MongoDB for file metadata.

### Why

Storing uploaded files directly inside MongoDB would unnecessarily increase database size and complicate file delivery.

Cloudinary provides dedicated file storage and URL-based access while MongoDB stores only the metadata required by the application.

## 7. Multiple File Uploads

### Decision

Support multiple files for both Clients and Projects.

### Why

Client and project records may require several supporting documents.

The frontend therefore uses a multiple file picker and sends all selected files using the same `files` multipart field.

## 8. Multipart Form Submission

### Decision

Use `multipart/form-data` for create and update requests involving files.

### Why

JSON request bodies cannot directly carry browser `File` objects.

Using `FormData` allows regular fields and binary files to be submitted in the same request.

## 9. File Upload Processing

### Decision

Use Multer memory storage before uploading files to Cloudinary.

### Why

The backend only needs the file buffer temporarily before sending it to external storage.

This avoids creating temporary files on the application server and is suitable for the serverless deployment environment.

## 10. Server-Side Search and Filtering

### Decision

Project search and status filtering are handled by the backend.

### Why

The dashboard may eventually contain a large number of projects.

Server-side filtering reduces unnecessary data transfer and keeps filtering logic close to the database.

## 11. Append-on-Update File Behavior

### Decision

New files uploaded during an update are appended to the existing file list.

### Why

Updating project or client information should not unexpectedly remove previously uploaded documents.

Existing files therefore remain associated with the record unless an explicit file-management operation removes them.

## 12. Frontend and Backend Separation

### Decision

Deploy frontend and backend as separate applications.

### Why

This keeps responsibilities independent and allows each layer to be developed and deployed independently.

The frontend focuses on UI and application state while the backend owns business logic, validation, authorization, and persistence.
