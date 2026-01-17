# MongoDB & Backend Setup Guide

## Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account
- MongoDB Compass installed

## Setup Instructions

### 1. **MongoDB Compass Connection**

If you want to use **MongoDB locally**:
- Open MongoDB Compass
- Connection String: `mongodb://localhost:27017`
- Create a new database called `civic-issues`

If you want to use **MongoDB Atlas** (cloud):
- Go to https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get the connection string
- Update `.env` file with your Atlas connection string

### 2. **Backend Setup**

Navigate to backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Update `.env` file with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/civic-issues
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
```

Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### 3. **Frontend Setup**

Install required dependencies:
```bash
npm install axios @react-native-async-storage/async-storage
```

The API service is already set up in `services/api.ts`

### 4. **API Endpoints**

**Auth:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get user profile
- `PATCH /api/auth/update` - Update profile
- `POST /api/auth/change-password` - Change password

**Issues:**
- `POST /api/issues` - Create new issue
- `GET /api/issues` - Get all issues (with filters)
- `GET /api/issues/user/my-issues` - Get user's issues
- `GET /api/issues/:id` - Get single issue
- `PATCH /api/issues/:id` - Update issue
- `POST /api/issues/:id/comments` - Add comment
- `DELETE /api/issues/:id` - Delete issue

### 5. **Testing**

Use Postman or similar tool to test APIs:

**Register:**
```
POST http://localhost:5000/api/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Create Issue:**
```
POST http://localhost:5000/api/issues
Headers:
Authorization: Bearer {token_from_login}

Body:
{
  "title": "Pothole on Main Street",
  "description": "Large pothole near the intersection",
  "category": "Pothole",
  "location": "Main Street, Downtown",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "image": "image_url_or_base64"
}
```

### 6. **Database Schema**

**Users Collection:**
- name, email, password, phone, avatar, role, isActive, timestamps

**Issues Collection:**
- title, description, category, status, priority, location, coordinates
- userId (reference to User), comments, timestamps

## Troubleshooting

1. **MongoDB connection error:**
   - Make sure MongoDB is running
   - Check connection string in `.env`
   - For Atlas: Allow IP address in network access

2. **Port already in use:**
   - Change PORT in `.env` file
   - Or kill process using port 5000

3. **CORS errors:**
   - Make sure frontend is making requests to `http://localhost:5000`
   - Check `localhost` IP (use machine IP for mobile testing)
