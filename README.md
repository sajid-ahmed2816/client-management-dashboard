# Client Management Dashboard

A production-style full-stack Client Management Dashboard built as a practical assessment project.

The application provides an authenticated workspace for managing clients and their associated projects. Users can create, view, update, search, filter, and delete client and project records. Both clients and projects support multiple file uploads, with files stored externally through Cloudinary while file metadata is persisted in MongoDB.

## Live Application

* Frontend: https://client-management-dashboard-obim.vercel.app
* Backend API: https://client-management-dashboard-mu.vercel.app

## Repository Structure

client-management-dashboard/
├── frontend/
├── backend/
└── docs/

### Frontend

The frontend is a React Single Page Application built with TypeScript and Vite.

Main responsibilities:

* Authentication UI
* Client management
* Project management
* Project search and filtering
* Form handling and validation
* File selection and upload handling
* Redux state management
* Protected routing
* Responsive dashboard UI

### Backend

The backend is a REST API built with Node.js, Express.js, TypeScript, MongoDB, and Mongoose.

Main responsibilities:

* Authentication
* Authorization
* Client CRUD operations
* Project CRUD operations
* Server-side project search and filtering
* Request validation
* File upload processing
* Cloudinary integration
* Database operations

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Material UI
* Redux Toolkit
* React Redux
* React Hook Form
* Axios
* React Router
* SweetAlert2

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* HttpOnly Cookies
* Zod
* Multer
* Cloudinary
* Helmet
* CORS
* bcrypt

## Core Features

### Authentication

* User signup
* User login
* Current-user/session validation
* Logout
* JWT-based authentication
* HttpOnly authentication cookie
* Protected application routes

### Client Management

Users can:

* Create clients
* View clients
* Edit clients
* Delete clients
* Store client name, email, and company
* Upload multiple client files
* View previously uploaded client files

### Project Management

Users can:

* Create projects
* View projects as cards
* Edit projects
* Delete projects
* Assign projects to clients
* Set project status
* Upload multiple project files
* Search projects
* Filter projects by status

Supported project statuses:

* Pending
* In Progress
* Completed

### File Management

Both clients and projects support multiple file uploads.

The frontend sends files using `multipart/form-data`.

The backend processes files using Multer and uploads them to Cloudinary.

MongoDB stores file metadata such as:

* File path
* Original file name
* Cloudinary URL
* Cloudinary resource type

When a record is updated, newly uploaded files are appended to the existing file collection rather than replacing previously stored files.

## Architecture

                    ┌──────────────────────┐
                    │      React SPA       │
                    │ React + TypeScript   │
                    │      + MUI           │
                    └──────────┬───────────┘
                               │
                               │ Axios
                               │ HTTP / HTTPS
                               ▼
                    ┌──────────────────────┐
                    │     Express API      │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌───────────┐    ┌───────────┐   ┌────────────┐
        │ MongoDB   │    │ Cloudinary│   │    Auth    │
        │           │    │           │   │ JWT/Cookie │
        └───────────┘    └───────────┘   └────────────┘

## Development Setup

### Prerequisites

* Node.js 18/20+
* npm
* MongoDB / MongoDB Atlas
* Cloudinary account

### Frontend

cd frontend
npm install
npm run dev

### Backend

cd backend
npm install
npm run dev

## Environment Variables

### Backend

Create:

backend/.env

Required variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### Frontend

Create:

frontend/.env.development

Example:

VITE_API_URL=http://localhost:5000/api

Production uses the deployed API/rewrite configuration.

## Production

The application is deployed using Vercel.

The frontend and backend are deployed separately, with the frontend configured to proxy API requests to the backend in production.

## Documentation

Additional technical documentation is available in the `docs/` directory:

* Architecture
* Database design
* Technical decisions
* API reference
* Authentication
* File management
* Local setup
* Testing

## Design Goals

The implementation focuses on:

* Clear separation of frontend and backend responsibilities
* Type safety with TypeScript
* Secure cookie-based authentication
* Server-side project filtering
* Reusable validation
* Modular backend architecture
* External file storage
* Responsive dashboard UX
* Maintainable and extensible code structure

## Future Improvements

Potential future improvements include:

* Role-based access control
* Individual file deletion
* File replacement management
* Pagination for clients and projects
* Automated API testing
* Audit logs
* Advanced dashboard analytics
* Soft deletion
* More granular permissions
