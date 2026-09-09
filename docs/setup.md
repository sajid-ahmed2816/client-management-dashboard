# Local Development Setup

## Node.js Version Requirements

The project uses different Node.js versions for the frontend and backend due to compatibility requirements in the development environment.

### Backend

The backend is developed and tested with **Node.js 18**.

Node.js 18 is used for the backend because it provides reliable compatibility with the MongoDB connection in the development environment.

Backend → Node.js 18

### Frontend

The frontend uses **Node.js 20 or later** because the current Vite setup requires Node.js 20+.

Frontend → Node.js 20+

### Recommended Development Setup

If developing both applications locally:

Backend:
Node.js 18

Frontend:
Node.js 20+

The frontend and backend are independent applications, so using different Node.js versions does not affect the application architecture or production deployment.

---

## Requirements

Install or configure the following before starting:

* Node.js 18 for backend development
* Node.js 20+ for frontend development
* npm
* MongoDB or MongoDB Atlas
* Cloudinary account

## Clone Repository

git clone https://github.com/sajid-ahmed2816/client-management-dashboard.git
cd client-management-dashboard

## Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a `.env` file in the backend directory.

### Environment Variables

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

### Start Development Server

npm run dev

### Build Backend

npm run build

### Start Production Build

npm start

## Frontend Setup

Open a second terminal and navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Create a `.env.development` file in the frontend directory.

### Environment Variables

VITE_API_URL=http://localhost:5000/api

### Start Development Server

npm run dev

### Build Frontend

npm run build

### Run Linting

npm run lint

## Development URLs

### Frontend

http://localhost:5173

### Backend

http://localhost:5000

### API

http://localhost:5000/api

## Environment Security

Environment files containing secrets must never be committed to Git.

Only `.env.example` files should be committed to the repository when environment variable documentation is required.

Sensitive values include:

* MongoDB credentials
* JWT secret
* Cloudinary API key
* Cloudinary API secret

## Production Deployment

The application is deployed using Vercel.

The frontend and backend are deployed independently.

Production environment variables must be configured in the respective Vercel project settings rather than committed to the repository.

The production deployment uses environment-specific configuration and does not require local development environment files.
