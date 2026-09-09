# File Management

## Overview

Clients and Projects support multiple file uploads.

Files are transferred from the browser using `multipart/form-data`, processed by Multer, uploaded to Cloudinary, and represented in MongoDB using metadata.

## Upload Flow

User selects files
       │
       ▼
React File objects
       │
       ▼
FormData
       │
       ▼
Axios
       │
       ▼
Express API
       │
       ▼
Multer memoryStorage
       │
       ▼
Cloudinary
       │
       ▼
File metadata
       │
       ▼
MongoDB

## Frontend

The file picker supports multiple files.

The frontend preserves previously selected files when the user opens the file picker again.

Duplicate selections are filtered using:

* File name
* File size
* Last modified timestamp

The frontend then appends each file to the same `files` FormData field.

Example:

files = [
  File,
  File,
  File
]

## Backend

Multer processes the request using memory storage.

The API accepts:

upload.array("files", 5)

This allows up to 5 files per request.

The configured maximum file size is 10 MB per file.

## Cloudinary

Each file is uploaded to a record-specific path.

Example:

clients/{clientId}/document.pdf
projects/{projectId}/requirements.pdf

The application stores:

path
name
url
resourceType

in MongoDB.

## Create Behavior

When a new client or project is created:

1. The database record is created.
2. Uploaded files are processed.
3. Files are uploaded to Cloudinary.
4. Cloudinary metadata is stored in MongoDB.
5. The completed resource is returned to the frontend.

If file processing fails, the newly created database record is cleaned up.

## Update Behavior

When an existing record is updated:

1. Existing record is loaded.
2. Regular fields are updated.
3. New files are uploaded if provided.
4. New file metadata is appended to existing files.
5. The updated record is saved.

Existing files are retained.

Example:

Before update:
contract.pdf
proposal.pdf

Uploaded during update:
invoice.pdf
requirements.pdf

After update:
contract.pdf
proposal.pdf
invoice.pdf
requirements.pdf

## Delete Behavior

When a client or project is deleted:

1. Associated file metadata is read.
2. The backend attempts to delete each Cloudinary file.
3. The database record is deleted.

Cloudinary deletion failures are logged for troubleshooting.

## Future File Management

The current implementation focuses on upload and retention.

A future enhancement can provide individual file deletion using a dedicated file identifier and endpoint.

Possible future endpoint:

DELETE /clients/:clientId/files/:fileId

This would allow users to remove individual files without deleting the entire client or project.
