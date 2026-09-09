# API Reference

## Base URL

Development:

http://localhost:5000/api

Production:

https://client-management-dashboard-mu.vercel.app/api

## Authentication

### Signup

POST /auth/signup

Creates a new user account.

### Login

POST /auth/login

Authenticates the user and creates an authenticated session using an HttpOnly cookie.

### Current User

GET /auth/me

Returns the currently authenticated user.

### Logout

POST /auth/logout

Clears the authenticated session.

---

# Clients

## Create Client

POST /clients
Content-Type: multipart/form-data

Fields:

name
email
company
files[]

Multiple files can be uploaded using the `files` field.

## Get Clients

GET /clients

Returns clients belonging to the authenticated user.

## Get Client

GET /clients/:id

Returns a single client owned by the authenticated user.

## Update Client

POST /clients/:id/update
Content-Type: multipart/form-data

Fields:

name
email
company
files[]

New files are appended to the existing files.

## Delete Client

DELETE /clients/:id

Deletes the client and attempts to remove its associated files from Cloudinary.

---

# Projects

## Create Project

POST /projects
Content-Type: multipart/form-data

Fields:

name
description
status
clientId
files[]

Supported status values:

pending
in-progress
completed

## Get Projects

GET /projects

Returns projects belonging to the authenticated user.

## Search Projects

GET /projects?search=website

Search is performed server-side.

## Filter Projects by Status

GET /projects?status=in-progress

## Search and Filter Together

GET /projects?search=website&status=in-progress

## Get Project

GET /projects/:id

Returns a single project owned by the authenticated user.

## Update Project

POST /projects/:id/update
Content-Type: multipart/form-data

Fields:

name
description
status
clientId
files[]

New files are appended to existing project files.

## Delete Project

DELETE /projects/:id

Deletes the project and attempts to remove associated files from Cloudinary.

---

# Authentication

All client and project endpoints require authentication.

The authentication cookie is sent automatically by the browser.

## Error Responses

Typical status codes:

| Status | Meaning                         |
| ------ | ------------------------------- |
| 200    | Request successful              |
| 201    | Resource created                |
| 400    | Validation or malformed request |
| 401    | Authentication required         |
| 403    | Access denied                   |
| 404    | Resource not found              |
| 500    | Internal server error           |

## File Upload Limits

The backend accepts multiple files per request.

The current Multer configuration allows up to 5 files per request and limits each file to 10 MB.
