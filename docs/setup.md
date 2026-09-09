# Local Development Setup

## Requirements

Install the following before starting:

* Node.js 18/20+
* npm
* MongoDB or MongoDB Atlas
* Cloudinary account

## Clone Repository

git clone https://github.com/sajid-ahmed2816/client-management-dashboard.git
cd client-management-dashboard

## Backend Setup

cd backend
npm install

Create:

.env

Example:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Start development server:

npm run dev

Build:

npm run build

Start production build:

npm start

## Frontend Setup

Open a second terminal:

cd frontend
npm install

Create:

.env.development

Example:

VITE_API_URL=http://localhost:5000/api

Start development server:

npm run dev

Build frontend:

npm run build

Run linting:

npm run lint

## Development URLs

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

API:

http://localhost:5000/api

## Environment Security

Environment files containing secrets must never be committed to Git.

Only `.env.example` files should be committed to the repository.

Sensitive values include:

* MongoDB credentials
* JWT secret
* Cloudinary API key
* Cloudinary API secret

## Production Deployment

The application is deployed using Vercel.

Frontend and backend are deployed independently.

Production environment variables must be configured in the Vercel project settings rather than committed to the repository.
