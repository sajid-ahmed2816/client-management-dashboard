# Database Design

## 1. Overview

The application uses **MongoDB** as the database and **Mongoose** as the ODM (Object Data Modeling) library.

MongoDB was selected because the application has a relatively simple relational structure while still benefiting from a flexible document-based database. Mongoose provides schema definitions, validation, relationships through `ObjectId` references, timestamps, and model-level constraints.

The database consists of three core entities:

* User
* Client
* Project

### High-Level Relationships

```text
User
 ├── has many Clients
 └── has many Projects

Client
 └── has many Projects

Project
 └── belongs to one Client
```

The application uses references between collections instead of embedding related documents.

---

# 2. Entity Relationship Diagram

                         ┌─────────────────┐
                         │      User       │
                         ├─────────────────┤
                         │ _id             │
                         │ name            │
                         │ email           │
                         │ password        │
                         │ createdAt       │
                         │ updatedAt       │
                         └────────┬────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                createdBy                   createdBy
                    │                           │
                    ▼                           ▼
          ┌─────────────────┐        ┌─────────────────┐
          │     Client      │        │     Project     │
          ├─────────────────┤        ├─────────────────┤
          │ _id             │        │ _id             │
          │ name            │        │ name            │
          │ email           │        │ description     │
          │ company         │        │ status          │
          │ createdBy       │        │ clientId        │
          │ createdAt       │        │ createdBy       │
          │ updatedAt       │        │ createdAt       │
          └────────┬────────┘        │ updatedAt       │
                   │                 └─────────────────┘
                   │
                   │ clientId
                   │
                   └─────────────── 1 : N

---

# 3. User Collection

The `User` collection stores staff accounts used to authenticate and authorize access to the application.

## Fields

| Field       | Type     | Required | Unique | Description                         |
| ----------- | -------- | -------: | -----: | ----------------------------------- |
| `_id`       | ObjectId |      Yes |    Yes | MongoDB-generated unique identifier |
| `name`      | String   |      Yes |     No | Staff member's name                 |
| `email`     | String   |      Yes |    Yes | Login email address                 |
| `password`  | String   |      Yes |     No | Bcrypt-hashed password              |
| `createdAt` | Date     |      Yes |     No | Account creation timestamp          |
| `updatedAt` | Date     |      Yes |     No | Last update timestamp               |

## Validation Rules

* `name` must be provided.
* `email` must be provided.
* Email is normalized before storage.
* Email must be unique.
* Password must be stored only after hashing.
* Plain-text passwords must never be persisted.

## Security Considerations

The password field contains a bcrypt hash rather than the original password.

Passwords should also be excluded from normal API responses so that sensitive authentication data is never returned to the frontend.

---

# 4. Client Collection

The `Client` collection stores customer information managed by staff.

## Fields

| Field       | Type     | Required | Unique | Description                                  |
| ----------- | -------- | -------: | -----: | -------------------------------------------- |
| `_id`       | ObjectId |      Yes |    Yes | MongoDB-generated unique identifier          |
| `name`      | String   |      Yes |     No | Client's name                                |
| `email`     | String   |      Yes |     No | Client's email address                       |
| `company`   | String   |       No |     No | Client's company name                        |
| `createdBy` | ObjectId |      Yes |     No | Reference to the User who created the client |
| `createdAt` | Date     |      Yes |     No | Client creation timestamp                    |
| `updatedAt` | Date     |      Yes |     No | Last update timestamp                        |

## Relationships

```text
User 1 ─────────── N Client
```

A single user can create multiple clients.

The `createdBy` field references the `_id` of a document in the `User` collection.

## Validation Rules

* `name` is required.
* `email` is required.
* Email should be normalized.
* `createdBy` must contain a valid User reference.

---

# 5. Project Collection

The `Project` collection stores projects created and managed by staff members.

## Fields

| Field         | Type     | Required | Description                                   |
| ------------- | -------- | -------: | --------------------------------------------- |
| `_id`         | ObjectId |      Yes | MongoDB-generated unique identifier           |
| `name`        | String   |      Yes | Project name                                  |
| `description` | String   |       No | Project description                           |
| `status`      | String   |      Yes | Current project status                        |
| `clientId`    | ObjectId |      Yes | Reference to the associated Client            |
| `createdBy`   | ObjectId |      Yes | Reference to the User who created the project |
| `createdAt`   | Date     |      Yes | Project creation timestamp                    |
| `updatedAt`   | Date     |      Yes | Last update timestamp                         |

## Relationships

```text
Client 1 ─────────── N Project

User   1 ─────────── N Project
```

Each project belongs to exactly one client.

A client can have multiple projects.

The `createdBy` field identifies the staff member who created the project.

---

# 6. Project Status

Project status is implemented as a controlled set of values.

```text
pending
in-progress
completed
```

### Status Flow

```text
Pending
   │
   ▼
In Progress
   │
   ▼
Completed
```

The API does not accept arbitrary status values.

This prevents inconsistent data such as:

```text
"Pending"
"pending"
"Pending Project"
"inprogress"
"complete"
```

Instead, the backend validates the value against the supported status list.

The frontend will use these same values when displaying filters, forms, and status indicators.

---

# 7. Relationships

## User → Client

```text
User 1 ─────────── N Client
```

One staff user can create multiple clients.

The relationship is maintained through:

```text
Client.createdBy → User._id
```

---

## User → Project

```text
User 1 ─────────── N Project
```

One staff user can create multiple projects.

The relationship is maintained through:

```text
Project.createdBy → User._id
```

---

## Client → Project

```text
Client 1 ─────────── N Project
```

One client can have multiple projects.

Each project belongs to one client through:

```text
Project.clientId → Client._id
```

---

# 8. Why References Instead of Embedded Documents?

Projects are stored in a separate collection instead of being embedded inside a Client document.

This decision was made for several reasons:

1. Projects have their own CRUD operations.
2. Projects have an independent lifecycle and status.
3. The dashboard needs to query projects independently.
4. Project search and filtering can be performed without loading an entire client document.
5. The project collection can grow independently from the client document.
6. Separating entities keeps responsibilities clear.
7. References make the relationship easier to extend in the future.

For example, embedding projects could result in a structure such as:

```text
Client
 └── projects[]
      ├── Project 1
      ├── Project 2
      └── Project 3
```

Instead, the application keeps projects as independent documents:

```text
clients collection
       │
       └── Client _id

projects collection
       │
       ├── Project → clientId
       ├── Project → clientId
       └── Project → clientId
```

This is better suited to the application's independent project management requirements.

---

# 9. ObjectId References

Relationships are represented using MongoDB `ObjectId` values.

For example:

```text
Project.clientId
        ↓
Client._id
```

and:

```text
Project.createdBy
        ↓
User._id
```

Mongoose references can later be populated when related information is required by the API.

For example, project responses may populate the associated client information when appropriate rather than duplicating client data inside every project document.

---

# 10. Indexing Strategy

Indexes will be added where they provide meaningful query performance benefits.

### User

The `email` field will have a unique index because it is used during authentication and must not have duplicate accounts.

```text
User.email → unique index
```

### Projects

The project listing functionality supports searching/filtering by status and association with a client.

Potential indexes include:

```text
Project.status
Project.clientId
Project.createdBy
```

These indexes can improve filtering and ownership-based queries as the dataset grows.

Indexes will be kept purposeful rather than adding indexes to every field, since unnecessary indexes increase storage requirements and write overhead.

---

# 11. Timestamps

All models use Mongoose timestamps.

Mongoose will automatically maintain:

```text
createdAt
updatedAt
```

This provides consistent creation and modification tracking without manually setting timestamps inside controllers.

These fields can also support:

* Sorting projects by creation date
* Showing recently created records
* Auditing changes
* Future activity/history features

---

# 12. Delete Behavior

Projects are associated with clients through `clientId`.

Before deleting a client, the backend should account for any projects associated with that client.

The initial implementation will avoid silently deleting related projects.

A suitable approach is to prevent deletion of a client that still has associated projects and return a clear API error.

For example:

```text
Cannot delete client because associated projects exist.
```

This protects against accidental loss of project records.

A future version could introduce explicit cascading deletion or soft deletion if the business requirements require it.

---

# 13. Ownership and Authorization

The `createdBy` field on Clients and Projects provides a foundation for ownership-based authorization.

For example:

```text
Client.createdBy === authenticatedUser._id
```

and:

```text
Project.createdBy === authenticatedUser._id
```

This allows the application to support rules such as:

* Staff can only view their own clients.
* Staff can only modify projects they own.
* Admin users can access all records.

The initial schema therefore supports future role-based or ownership-based authorization without requiring a major database redesign.

---

# 14. Data Integrity

Data integrity will primarily be enforced at the backend/API layer and supported by Mongoose schema validation.

Important rules include:

* Required fields cannot be omitted.
* Email values must be valid.
* User emails must be unique.
* Project status must use an allowed value.
* Client references must contain valid ObjectIds.
* Project references must contain valid ObjectIds.
* Passwords must always be hashed before persistence.
* Authentication-related fields must not be exposed through normal API responses.

Frontend validation will improve user experience, but backend validation remains authoritative because API requests can be made independently of the frontend.

---

# 15. Example Documents

## User

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "bcrypt-hash",
  "createdAt": "2026-09-06T00:00:00.000Z",
  "updatedAt": "2026-09-06T00:00:00.000Z"
}
```

## Client

```json
{
  "_id": "ObjectId",
  "name": "Acme Client",
  "email": "client@acme.com",
  "company": "Acme Corporation",
  "createdBy": "UserObjectId",
  "createdAt": "2026-09-06T00:00:00.000Z",
  "updatedAt": "2026-09-06T00:00:00.000Z"
}
```

## Project

```json
{
  "_id": "ObjectId",
  "name": "Company Website",
  "description": "Corporate website development project",
  "status": "in-progress",
  "clientId": "ClientObjectId",
  "createdBy": "UserObjectId",
  "createdAt": "2026-09-06T00:00:00.000Z",
  "updatedAt": "2026-09-06T00:00:00.000Z"
}
```

---

# 16. Query Requirements

The database design supports the dashboard requirements without requiring a separate reporting database.

Examples include:

### Search Projects

```text
GET /api/projects?search=website
```

### Filter by Status

```text
GET /api/projects?status=in-progress
```

### Filter by Client

```text
GET /api/projects?clientId=<clientId>
```

### Combine Filters

```text
GET /api/projects?search=website&status=in-progress
```

These queries can be handled through MongoDB filters and Mongoose query methods.

---

# 17. Security Considerations

Sensitive information should be handled carefully at the database and API layers.

### Password Security

Passwords are hashed using bcrypt before being stored.

The original password is never persisted.

### Authentication Data

JWT authentication tokens are stored in secure HttpOnly cookies rather than browser localStorage.

### API Responses

Sensitive fields such as the user's password hash must never be returned to the frontend.

### Environment Variables

Database connection strings and authentication secrets are stored in environment variables.

They are not committed to source control.

---

# 18. Assumptions

The initial implementation makes the following assumptions:

1. Users represent staff members who can log into the dashboard.
2. A client can have multiple projects.
3. Each project belongs to one client.
4. A project has one current status at a time.
5. The initial project statuses are `pending`, `in-progress`, and `completed`.
6. Users can create clients and projects.
7. Ownership is tracked through `createdBy`.
8. The initial assessment does not require a separate Client login system.
9. The initial implementation does not require project assignment to multiple staff members.
10. Additional requirements introduced during the assessment may require extending the schema.

---

# 19. Future Extensibility

The current schema intentionally focuses on the requirements of the assessment while keeping the design extensible.

Potential future additions include:

### User

* `role`
* `isActive`
* `lastLoginAt`

### Client

* `phone`
* `address`
* `notes`
* `isActive`

### Project

* `priority`
* `dueDate`
* `assignedTo`
* `startDate`
* `completedAt`
* `tags`

Additional collections could also be introduced for:

* Project activity history
* Comments
* Notifications
* Staff assignments
* Audit logs

These additions can be introduced without fundamentally changing the existing User → Client → Project relationships.

---

# 20. Design Summary

The database follows a simple and maintainable structure:

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Client         Project
 │               ▲
 │               │
 └───────────────┘
       clientId
```

The design prioritizes:

* Clear entity boundaries
* Explicit relationships
* Backend validation
* Secure authentication data handling
* Independent project management
* Efficient querying
* Ownership tracking
* Future extensibility

MongoDB and Mongoose provide enough flexibility for the current assessment while keeping the data model straightforward and maintainable.
