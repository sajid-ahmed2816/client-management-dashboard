# File Storage and Metadata

Both `Client` and `Project` documents support multiple uploaded files.

Files are represented using a reusable file schema.

## File Metadata

Each uploaded file contains:

| Field          | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| `path`         | String | Logical storage path used for the record |
| `name`         | String | Original uploaded file name              |
| `url`          | String | Cloudinary secure URL                    |
| `resourceType` | String | Cloudinary resource type                 |

Example:

{
  "path": "clients/68abc123",
  "name": "contract.pdf",
  "url": "https://res.cloudinary.com/...",
  "resourceType": "raw"
}

## Client Files

A client can contain multiple files:

Client
 ├── name
 ├── email
 ├── company
 ├── files[]
 │    ├── File
 │    ├── File
 │    └── File
 └── createdBy

## Project Files

A project can also contain multiple files:

Project
 ├── name
 ├── description
 ├── status
 ├── clientId
 ├── files[]
 │    ├── File
 │    ├── File
 │    └── File
 └── createdBy

## File Storage Strategy

The actual file content is stored in Cloudinary.

MongoDB stores only the metadata required to reference the uploaded file.

This avoids storing binary file content inside MongoDB and keeps the application database focused on application data.

## Upload Behavior

Files are uploaded using `multipart/form-data`.

Multiple files are accepted in a single request.

The backend uses Multer with memory storage to receive uploaded files before passing their buffers to Cloudinary.

## Update Behavior

Updating a client or project does not automatically remove existing files.

Newly uploaded files are appended to the existing file list.

For example:

Existing:
A.pdf
B.pdf

New upload:
C.pdf
D.pdf

Result:
A.pdf
B.pdf
C.pdf
D.pdf

This allows users to add additional documents without losing previously uploaded files.

## Cleanup

When a client or project is deleted, the backend attempts to remove its associated Cloudinary files before deleting the database record.

Cloudinary deletion failures are logged so that a storage cleanup issue does not silently go unnoticed.
