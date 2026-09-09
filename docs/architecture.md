# System Architecture

## 1. Overview

The Client Management Dashboard follows a client-server architecture with a React frontend and an Express REST API backend.

The system is divided into independent frontend and backend applications:

client-management-dashboard/
├── frontend/
├── backend/
└── docs/

The separation allows the frontend and backend to be developed, tested, deployed, and scaled independently.

## 2. High-Level Architecture

┌───────────────────────────────┐
│           Frontend            │
│                               │
│ React + TypeScript + Vite     │
│ Material UI                   │
│ Redux Toolkit                 │
│ React Hook Form               │
└───────────────┬───────────────┘
                │
                │ HTTPS / REST API
                ▼
┌───────────────────────────────┐
│            Backend            │
│                               │
│ Node.js + Express + TypeScript│
│ Middleware                    │
│ Controllers                   │
│ Services                      │
│ Models                        │
└───────────────┬───────────────┘
                │
        ┌───────┴────────┐
        │                │
        ▼                ▼
┌──────────────┐  ┌──────────────┐
│   MongoDB    │  │  Cloudinary  │
│              │  │              │
│ Application  │  │ File Storage │
│ Data         │  │              │
└──────────────┘  └──────────────┘

## 3. Frontend Architecture

The frontend is a React Single Page Application.

### Main responsibilities

* Rendering the dashboard
* Managing authentication state
* Managing client state
* Managing project state
* Handling forms
* Sending API requests
* Handling file selection
* Displaying uploaded files
* Protecting authenticated routes

### State Management

Redux Toolkit is used for application-level state.

Main state areas include:

auth
client
project

Redux async thunks are responsible for API operations such as:

* Login
* Signup
* Logout
* Get current user
* Create client
* Get clients
* Update client
* Delete client
* Create project
* Get projects
* Update project
* Delete project

## 4. Backend Architecture

The backend follows a layered architecture.

Request
   │
   ▼
Route
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Model
   │
   ▼
MongoDB

### Routes

Routes define the available API endpoints and attach middleware such as authentication and file upload processing.

### Middleware

Middleware is responsible for cross-cutting concerns such as:

* Authentication
* Cookie parsing
* CORS
* Security headers
* File processing
* Request handling

### Controllers

Controllers handle HTTP-level responsibilities:

* Reading request data
* Running request validation
* Calling services
* Returning HTTP responses

Controllers do not contain the main business logic.

### Services

Services contain application/business logic.

Examples:

* Creating clients
* Updating clients
* Creating projects
* Updating projects
* Uploading files
* Deleting records
* Checking record ownership

### Models

Mongoose models define the database structure and relationships.

Core models:

* User
* Client
* Project

## 5. Authentication Flow

Authentication uses JWT stored in an HttpOnly cookie.

Login
  │
  ▼
Validate credentials
  │
  ▼
Generate JWT
  │
  ▼
Set HttpOnly cookie
  │
  ▼
Browser stores cookie
  │
  ▼
Protected API request
  │
  ▼
Authentication middleware
  │
  ▼
Verify JWT
  │
  ▼
Attach authenticated user

The frontend does not need direct access to the JWT.

## 6. File Upload Architecture

Files are not stored directly inside MongoDB.

Instead:

Browser
   │
   │ multipart/form-data
   ▼
Multer
   │
   │ memory buffer
   ▼
Cloudinary
   │
   ▼
File URL + metadata
   │
   ▼
MongoDB

MongoDB stores file metadata while Cloudinary stores the actual file.

## 7. Project Search and Filtering

Project search and status filtering are performed server-side.

Example:

GET /api/projects?search=website&status=in-progress

The frontend sends the current search/filter state to the backend.

The backend performs the query and returns only matching projects.

This avoids loading all projects into the browser and filtering the entire dataset client-side.

## 8. Error Handling

The API uses a consistent response structure for successful and failed operations.

Controllers handle expected errors and return appropriate HTTP status codes.

Validation errors return client-friendly messages while internal errors are handled without exposing sensitive implementation details.

## 9. Deployment Architecture

The frontend and backend are deployed independently on Vercel.

User
 │
 ▼
Frontend Vercel Deployment
 │
 │ /api/*
 ▼
Backend Vercel Deployment
 │
 ├── MongoDB Atlas
 │
 └── Cloudinary

The frontend uses Vercel rewrite configuration to route production API requests to the backend.

This also keeps frontend API calls consistent between development and production environments.

## 10. Architectural Principles

The project follows these principles:

* Separation of concerns
* Single responsibility
* Reusable services
* Backend-authoritative validation
* Type safety
* Secure authentication
* External file storage
* Independent frontend/backend deployment
* Server-side filtering
* Minimal duplication
