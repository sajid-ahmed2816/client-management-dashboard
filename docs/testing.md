# Testing and Verification

## 1. Authentication Testing

### Signup

Verify that:

* A new user can register.
* Required fields are validated.
* Duplicate email addresses are rejected.
* Passwords are not stored in plain text.

### Login

Verify that:

* Valid credentials authenticate successfully.
* Invalid credentials are rejected.
* Authentication cookie is created.
* Protected routes become accessible.

### Logout

Verify that:

* Logout clears the authentication session.
* Protected routes are no longer accessible.

## 2. Client Testing

### Create

Verify that:

* Client name is required.
* Email is required and validated.
* Company can be provided.
* Multiple files can be selected.
* Client is created successfully.
* Uploaded files are stored in Cloudinary.
* File metadata is stored in MongoDB.

### Read

Verify that:

* Authenticated users can view their clients.
* Client information is displayed correctly.
* Existing uploaded files are displayed.

### Update

Verify that:

* Client information can be edited.
* Existing files remain available.
* New files can be added.
* Updating without changes does not create unnecessary API requests.

### Delete

Verify that:

* Delete requires confirmation.
* Client is removed from the dashboard.
* Associated Cloudinary files are cleaned up where possible.

## 3. Project Testing

### Create

Verify:

* Project name validation.
* Description validation.
* Client selection.
* Status selection.
* Multiple file upload.
* Successful project creation.

### Search

Verify:

GET /projects?search=value

returns matching projects.

### Status Filtering

Verify:

GET /projects?status=pending

returns only pending projects.

Test all supported statuses:

* pending
* in-progress
* completed

### Combined Filtering

Verify that search and status filters can be used together.

Example:

/projects?search=website&status=in-progress

### Update

Verify that:

* Project information can be changed.
* Client can be changed.
* Status can be changed.
* Existing files remain.
* New files are appended.

### Delete

Verify that:

* Delete confirmation is displayed.
* Project is removed.
* Associated files are cleaned up where possible.

## 4. File Upload Testing

Test:

* Single file upload
* Multiple file upload
* Reopening the file picker
* Selecting additional files
* Duplicate file selection
* Maximum file count
* File size limit
* Upload failure
* Existing files during edit

## 5. Authorization Testing

Verify that one authenticated user cannot:

* Read another user's clients.
* Update another user's clients.
* Delete another user's clients.
* Read another user's projects.
* Update another user's projects.
* Delete another user's projects.

## 6. Frontend Testing

Verify:

* Protected routes redirect correctly.
* Authentication state initializes correctly.
* Loading states work.
* API errors are displayed.
* Forms reset correctly.
* Dialogs open and close correctly.
* Search is debounced.
* Project cards display correctly.
* Client/project lists update after CRUD operations.

## 7. Production Verification

After deployment verify:

* Frontend loads correctly.
* Login works.
* Cookies are sent correctly.
* Client CRUD works.
* Project CRUD works.
* File uploads work.
* Search/filtering works.
* Logout works.
* Refreshing protected routes behaves correctly.
