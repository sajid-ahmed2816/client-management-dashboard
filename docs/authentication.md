# Authentication and Authorization

## 1. Overview

The application uses JWT-based authentication with HttpOnly cookies.

Authentication is required for protected client and project operations.

## 2. Authentication Flow

User submits login form
        │
        ▼
POST /api/auth/login
        │
        ▼
Validate email/password
        │
        ▼
Compare password hash
        │
        ▼
Generate JWT
        │
        ▼
Set HttpOnly cookie
        │
        ▼
Authenticated session

## 3. Password Security

Passwords are never stored in plain text.

The backend hashes passwords using bcrypt before persistence.

During login, the supplied password is compared against the stored hash.

## 4. JWT

The authenticated user's identity is represented by a signed JWT.

The token is stored in an HttpOnly cookie rather than browser localStorage.

This prevents application JavaScript from directly reading the authentication token.

## 5. Protected Requests

Authenticated requests include the cookie automatically.

The authentication middleware:

1. Reads the authentication cookie.
2. Verifies the JWT.
3. Extracts the authenticated user ID.
4. Attaches the user ID to the request.
5. Allows the protected controller to continue.

## 6. Ownership

Client and Project records contain a `createdBy` reference.

Protected operations verify that the authenticated user owns the requested resource.

Example:

Client.createdBy === authenticatedUserId

and:

Project.createdBy === authenticatedUserId

This prevents users from modifying records belonging to another account.

## 7. Logout

Logout invalidates the browser session by clearing the authentication cookie.

After logout, protected routes redirect the user to the login screen.

## 8. Frontend Authentication State

The frontend maintains authentication state through Redux.

On application initialization, the frontend checks the current authenticated user.

This prevents protected pages from being displayed before authentication state has been resolved.

## 9. Route Protection

The frontend separates public and protected routes.

Public routes include:

* Login
* Signup

Protected routes include:

* Dashboard
* Clients
* Projects

Unauthenticated users attempting to access protected routes are redirected to `/login`.

Authenticated users attempting to access public authentication pages are redirected to `/dashboard`.
