Client Management Dashboard is a full-stack web application designed to help staff manage clients and their associated projects from a centralized dashboard. The application provides authenticated access, client CRUD operations, project management, project status tracking, dashboard statistics, and secure file uploads.

The application follows a separated frontend/backend architecture using React and TypeScript on the frontend and Express with TypeScript on the backend. MongoDB is used for persistent storage, with Mongoose providing schema modeling and relationships.

### FEATURES
- User registration and authentication
- Secure login/logout
- Persistent authentication using HttpOnly cookies
- Dashboard overview
- Client management
- Project management
- Project status tracking
- Client/project relationships
- Search and filtering
- File upload for projects
- Cloudinary integration
- Form validation
- API validation
- Centralized API response handling
- Protected routes
- Responsive dashboard UI

### TECH STACK
- Frontend:	React, TypeScript, Vite
- UI:	Material UI
- State:	Redux Toolkit
- Routing:	React Router
- Forms:	React Hook Form
- HTTP:	Axios
- Backend:	Node.js, Express, TypeScript
- Database:	MongoDB
- ODM:	Mongoose
- Authentication:	JWT + HttpOnly Cookies
- Validation:	Zod
- Password: Hashing	bcrypt
- File Upload:	Multer
- File Storage:	Cloudinary
- Security:	Helmet, CORS
- Deployment:	Vercel

## Architecture
[docs/architecture.md]

## Database
[docs/database.md]

## API Documentation
[docs/api.md]

## Authentication
[docs/authentication.md]

## Frontend
[docs/frontend.md]

## Backend
[docs/backend.md]

## Setup
[docs/setup.md]

## Security
[docs/security.md]

## Testing
[docs/testing.md]

### LIVE APPLICATION
https://client-management-dashboard-mu.vercel.app